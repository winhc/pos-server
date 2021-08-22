import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toUserDto, toUserLoginReplyDto } from 'src/helper/maper/user.mapper';
import { comparePasswords } from 'src/helper/utils';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserLoginReplyDto } from './dto/user-login-reply.dto';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
const logger = new Logger('UserService');
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

  /**
   * create new user data
   * return UserLoginReplyDto
   */
  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const { account } = createUserDto;
    const userInDb = await this.userRepository.findOne({ where: { account } });
    if (userInDb) {
      throw new BadRequestException({description: 'User already exit'});
    }
    const user: User = await this.userRepository.create(createUserDto);
    try{
      await this.userRepository.save(user);
    }catch(error){
      logger.error(`create: ${error}`);
      throw new InternalServerErrorException({description: 'Create user fail'});
    }
    return toUserDto(user);
  }

  /**
   * find user data
   * return UserDto[]
   */
  async findAll(account?: string): Promise<UserDto[]> {
    try {
      if (account) {
        const user = await this.userRepository.find({ where: { account } });
        return user.map(user => toUserDto(user));
      } else {
        const user = await this.userRepository.find();
        return user.map(user => toUserDto(user));
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
      return await this.userRepository.findOneOrFail(id);
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
      return toUserDto(user)
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
    if (!user) {
      throw new BadRequestException({ description: 'User not found' });
    }
    try {
      const userToUpdate = Object.assign(user, updateUserDto);
      await this.userRepository.update(id, userToUpdate);
    } catch (error) {
      logger.error(`update : ${error}`);
      throw new InternalServerErrorException({ description: 'Update fail' })
    }
    const updateUser = await this.findOne(user.id);
    return toUserDto(updateUser);
  }

  /**
   * Delete entre user row data that matches given id.
   */
  async remove(id: number): Promise<UserDto> {
    const user = await this.findOne(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const deleteUser = await this.userRepository.remove(user);
    return toUserDto(deleteUser);
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
      throw new InternalServerErrorException({description: "Login user account is deactive"})
    }
  }

  /**
   * find user
   * return UserLoginReplyDto
   * for user login process
   */
  async findByLogin({ account, password }: UserLoginRequestDto): Promise<UserLoginReplyDto> {
    const user = await this.userRepository.findOne({ where: { account } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED)
    }

    const areEqual = await comparePasswords(user.password, password);
    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
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
