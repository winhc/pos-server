import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toUserTypeDto, toUserTypeModel } from 'src/helper/mapper/user-type.mapper';
import { formattedDate } from 'src/helper/utils';
import { Repository } from 'typeorm';
import { CreateUserTypeDto } from './dto/create-user-type.dto';
import { UpdateUserTypeDto } from './dto/update-user-type.dto';
import { UserTypeDto } from './dto/user-type-dto';
import { UserType } from './entities/user-type.entity';
const logger = new Logger('UserTypeService');

@Injectable()
export class UserTypeService {
  constructor(@InjectRepository(UserType) private readonly userTypeRepository: Repository<UserType>) { }

  /**
   * create new user type data
   * return UserTypeDto
   */
  async create(createUserTypeDto: CreateUserTypeDto): Promise<UserTypeDto> {
    const { user_role } = createUserTypeDto;

    const inDb = await this.userTypeRepository.findOne({ where: { user_role } });
    if (inDb) {
      throw new BadRequestException({ message: 'User type already exit' });
    }
    const userType: UserType = this.userTypeRepository.create(createUserTypeDto);
    try {
      await this.userTypeRepository.save(userType);
    } catch (error) {
      logger.error(`create: ${error}`);
      throw new InternalServerErrorException({ message: 'Create user type fail' });
    }
    const data = toUserTypeModel(userType);
    return toUserTypeDto(data);
  }

  /*
    * for first setup time
    * create initial admin user type
  */
  async initialCreateAdminRole(): Promise<UserTypeDto> {
    try {
      const adminRole: CreateUserTypeDto = { user_role: 'admin' };
      return await this.create(adminRole);
    } catch (error) {
      logger.error(`initial admin role create: ${error}`)
    }
  }

  /**
   * find user type data
   * return UserTypeDto
   */
  async findAll(page_size?: number, page_index?: number, user_role?: string, from_date?: string, to_date?: string): Promise<UserTypeDto> {
    try {
      if (user_role && from_date && to_date && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;
        const user_type = await this.userTypeRepository.createQueryBuilder('user_type')
          .select('*')
          .addSelect('COUNT(*) OVER () AS count')
          .where('DATE(user_type.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
          .andWhere('user_type.user_role LIKE :u_role', { u_role: `%${user_role}%` })
          .skip(fromIndex)
          .take(takeLimit)
          .orderBy('user_type.id')
          .getRawMany();
        const data = user_type.map(value => toUserTypeModel(value));
        const count = parseInt(user_type[0]?.count);
        return toUserTypeDto(data, count);
      }
      else if (from_date && to_date && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;
        const user_type = await this.userTypeRepository.createQueryBuilder('user_type')
          .select('*')
          .addSelect('COUNT(*) OVER () AS count')
          .where('DATE(user_type.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
          .skip(fromIndex)
          .take(takeLimit)
          .orderBy('user_type.id')
          .getRawMany();

        const data = user_type.map(value => toUserTypeModel(value));
        const count = parseInt(user_type[0]?.count);
        return toUserTypeDto(data, count);

      }
      else if (user_role && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;
        const user_type = await this.userTypeRepository.createQueryBuilder('user_type')
          .select('*')
          .addSelect('COUNT(*) OVER () AS count')
          .where('user_type.user_role LIKE :u_role', { u_role: `%${user_role}%` })
          .skip(fromIndex)
          .take(takeLimit)
          .orderBy('user_type.id')
          .getRawMany();
        const data = user_type.map(value => toUserTypeModel(value));
        const count = parseInt(user_type[0]?.count);
        return toUserTypeDto(data, count);
      }
      else if (page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;
        const [user_type, count] = await this.userTypeRepository.findAndCount({ skip: fromIndex, take: takeLimit });
        const data = user_type.map(value => toUserTypeModel(value));
        return toUserTypeDto(data, count);
      } else {
        const [user_type, count] = await this.userTypeRepository.findAndCount();
        const data = user_type.map(value => toUserTypeModel(value));
        return toUserTypeDto(data, count);
      }
    } catch (error) {
      logger.error(`findAll: ${error}`);
      throw new BadRequestException({ message: 'User type not found' });
    }
  }

  /**
   * find user_type data by id
   * return UserType Entity
   */
  async findOne(id: number): Promise<UserType> {
    try {
      return await this.userTypeRepository.findOneOrFail(id);
    } catch (error) {
      logger.warn(`findOne : ${error}`);
      throw new BadRequestException({ message: 'User type not found' });
    }
  }

  /**
   * find User type data by id
   * return UserTypeDto
   */
  async findById(id: number): Promise<UserTypeDto> {
    try {
      const user_type = await this.findOne(id);
      const data = toUserTypeModel(user_type);
      return toUserTypeDto(data)
    } catch (error) {
      throw new BadRequestException({ message: 'User type not found' });
    }
  }

  /**
   * Update User type row data that matches given id
   * return UserTypeDto
   */
  async update(id: number, updateUserTypeDto: UpdateUserTypeDto): Promise<UserTypeDto> {
    const user_type = await this.findOne(id);
    if (!user_type) {
      throw new BadRequestException({ message: 'User type not found' });
    }
    try {
      updateUserTypeDto.updated_at = new Date();
      const userTypeToUpdate = Object.assign(user_type, updateUserTypeDto);
      await this.userTypeRepository.update(id, userTypeToUpdate);
    } catch (error) {
      logger.error(`update : ${error}`);
      throw new InternalServerErrorException({ message: 'Update User type fail' })
    }
    const updateUserType = await this.findOne(user_type.id);
    const data = toUserTypeModel(updateUserType);
    return toUserTypeDto(data)
  }

  /**
   * Delete entre User type row data that matches given id.
   * return UserTypeDto
   */
  async remove(id: number): Promise<UserTypeDto> {
    const user_type = await this.userTypeRepository.findOne({where: {id}, relations: ['users']});
    if (!user_type) {
      throw new BadRequestException({ message: 'User type not found' });
    }
    if(user_type.users.length > 0){
      throw new BadRequestException({ message: `Can't delete this user type. This user type have related user account. If you want to delete this user type, first delete related user account.` });
    }
    const deleteUserType = await this.userTypeRepository.remove(user_type);
    const data = toUserTypeModel(deleteUserType);
    return toUserTypeDto(data)
  }
}
