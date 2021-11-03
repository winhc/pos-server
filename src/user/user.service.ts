import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toUserDto, toUserLoginReplyDto, toUserModel } from 'src/helper/mapper/user.mapper';
import { comparePasswords, formattedDate } from 'src/helper/utils';
import { UserTypeService } from 'src/user-type/user-type.service';
import { Repository } from 'typeorm';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserLoginReplyDto } from './dto/user-login-reply.dto';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
const logger = new Logger('UserService');
@Injectable()
export class UserService implements OnApplicationBootstrap {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userTypeService: UserTypeService) { }

  /*
    * for first setup time
    * create initial admin user type
    * and then
    * create initial admin user
  */
  async onApplicationBootstrap(): Promise<void> {
    const inDb = await this.userRepository.findOne({ id: 1 });
    if (!inDb) {
      const userType = await this.userTypeService.initialCreateAdminRole();
      logger.log(`userType: ${userType.data['id']}`);
      const adminUser: CreateUserDto = { user_name: 'posadmin', account: 'posadmin', password: 'posadmin', user_type: userType.data['id'], remarks: 'initial create admin' };
      this.create(adminUser);
      logger.debug('Initial admin user created');
    }
  }

  /**
   * create new user data
   * return UserDto
   */
  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const { account } = createUserDto;
    const userInDb = await this.userRepository.findOne({ where: { account } });
    if (userInDb) {
      throw new BadRequestException({ description: 'User already exit' });
    }
    const user: User = await this.userRepository.create(createUserDto);
    try {
      await this.userRepository.save(user);
    } catch (error) {
      logger.error(`create: ${error}`);
      throw new InternalServerErrorException({ description: 'Create user fail' });
    }
    const data = toUserModel(user);
    return toUserDto(data);
  }

  /**
   * find user data
   * return UserDto
   */
  async findAll(page_size?: number, page_index?: number, account?: string, from_date?: string, to_date?: string): Promise<UserDto> {
    try {
      if (account && from_date && to_date && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [user, count] = await this.userRepository.createQueryBuilder('user')
          .where('DATE(user.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
          .andWhere('user.account LIKE :u_account', { u_account: `%${account}%` })
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('user.user_type', 'user_type')
          .orderBy('user.id')
          .getManyAndCount();

        const data = user.map(value => toUserModel(value));
        return toUserDto(data, count);
      }
      else if (from_date && to_date && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;
        const [user, count] = await this.userRepository.createQueryBuilder('user')
          .where('DATE(user.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('user.user_type', 'user_type')
          .orderBy('user.id')
          .getManyAndCount();

        const data = user.map(value => toUserModel(value));
        return toUserDto(data, count);

      }
      else if (account && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;
        const [user, count] = await this.userRepository.createQueryBuilder('user')
          .where('user.account LIKE :u_account', { u_account: `%${account}%` })
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('user.user_type', 'user_type')
          .orderBy('user.id')
          .getManyAndCount();
        const data = user.map(value => toUserModel(value));
        return toUserDto(data, count);
      }
      else if (page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;
        const [user, count] = await this.userRepository.createQueryBuilder('user')
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('user.user_type', 'user_type')
          .orderBy('user.id')
          .getManyAndCount();
        const data = user.map(value => toUserModel(value));
        return toUserDto(data, count);
      } else {
        const [user, count] = await this.userRepository.createQueryBuilder('user')
          .leftJoinAndSelect('user.user_type', 'user_type')
          .orderBy('user.id')
          .getManyAndCount();
        const data = user.map(value => toUserModel(value));
        return toUserDto(data, count);
      }
    } catch (error) {
      logger.error(`findAll: ${error}`);
      throw new BadRequestException({ description: 'User not found' });
    }
  }

  /**
   * find user data by id
   * return User Entity
   */
  async findOne(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({where: {id}, relations: ['user_type']});
    } catch (error) {
      logger.warn(`findOne : ${error}`);
      throw new BadRequestException({ description: 'User not found' });
    }
  }

  /**
   * find user data by id
   * return UserDto
   */
  async findById(id: number): Promise<UserDto> {
    try {
      const user = await this.findOne(id);
      const data = toUserModel(user)
      return toUserDto(data)
    } catch (error) {
      throw new BadRequestException({ description: 'User not found' });
    }
  }

  /**
   * Update user row data that matches given id
   * return UserDto
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.findOne(id);
    const userObj = toUserModel(user); // update without password column
    if (!user) {
      throw new BadRequestException({ message: 'User not found' });
    }
    try {
      if(!updateUserDto.user_type){
        updateUserDto.user_type = user.user_type;
      }
      if(!updateUserDto.remarks){
        updateUserDto.remarks = `update user`;
      }
      updateUserDto.updated_at = new Date();
      const userToUpdate = Object.assign(userObj, updateUserDto);
      await this.userRepository.update(id, userToUpdate);
    } catch (error) {
      logger.error(`update : ${error}`);
      throw new InternalServerErrorException({ message: 'Update user fail' })
    }
    const updateUser = await this.findOne(user.id);
    const data = toUserModel(updateUser);
    return toUserDto(data)
  }

  /**
   * Change user password that matches given id
   * return UserDto
   */
  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto): Promise<UserDto> {
    const user = await this.findOne(id);
    if (!user) {
      throw new BadRequestException({ message: 'User not found' });
    }
    const areEqual = await comparePasswords(user.password, updatePasswordDto.current_password);
    if (!areEqual) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }
    try {
      const now = new Date();
      const updateUserDto = new UpdateUserDto();
      updateUserDto.updated_at = now;
      updateUserDto.remarks = 'update password on ' + now.getFullYear() + (now.getMonth() + 1) + now.getDate() + '_' + now.getHours() + now.getMinutes() + now.getSeconds();
      updateUserDto.password = updatePasswordDto.new_password;
      const userToUpdate = Object.assign(user, updateUserDto);
      await this.userRepository.update(id, userToUpdate);
    } catch (error) {
      logger.error(`update : ${error}`);
      throw new InternalServerErrorException({ message: 'Update user fail' })
    }
    const updateUser = await this.findOne(user.id);
    const data = toUserModel(updateUser);
    return toUserDto(data)
  }

  /**
   * Delete entre user row data that matches given id.
   * return UserDto
   */
  async remove(id: number): Promise<UserDto> {
    const user = await this.findOne(id);
    if (!user) {
      throw new BadRequestException({ description: 'User not found' });
    }
    const deleteUser = await this.userRepository.remove(user);
    const data = toUserModel(deleteUser);
    return toUserDto(data);
  }

  async findUser(options?: object): Promise<User> {
    try {
      return await this.userRepository.findOne(options);
    } catch (error) {
      logger.error(`findUser: ${error}`);
      throw new InternalServerErrorException({ description: "User is not found" })
    }
  }

  /**
   * find user account
   * return UserLoginReplyDto
   * this function can be used from any other services to find operation user
   */
  async findAccount(options?: object): Promise<UserLoginReplyDto> {
    try {
      const user = await this.userRepository.findOne(options);
      return toUserLoginReplyDto(user);
    } catch (error) {
      // If delete operation occur during user login and using this jwt auth
      // this Exceprion may be occur
      // TODO: in future -> first deactive user status before remove this user
      logger.error(`findAccount: ${error}`);
      throw new InternalServerErrorException({ description: "Login user account is deactive" })
    }
  }

  /**
   * find user
   * return UserLoginReplyDto
   * for user login process
   */
  async findByLogin({ account, password }: UserLoginRequestDto): Promise<UserLoginReplyDto> {
    const user = await this.userRepository.findOne({ where: { account }, relations: ['user_type'] });
    if (!user) {
      throw new HttpException('Invalid Username', HttpStatus.UNAUTHORIZED)
    }

    const areEqual = await comparePasswords(user.password, password);
    if (!areEqual) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    return toUserLoginReplyDto(user);
  }

  /**
   * find user
   * return UserLoginReplyDto
   * for user authentication/validation jwt process
   */
  async findByPayload({ account }: any): Promise<UserLoginReplyDto> {
    return await this.findAccount({ where: { account } });
  }
}
