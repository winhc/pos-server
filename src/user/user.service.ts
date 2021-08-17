import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
const logger = new Logger('UserService');
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      logger.log(`createUserDto=> ${createUserDto}`)
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      logger.error(`create: ${error}`);
      throw new BadRequestException;
    }
  }

  async findAll(account?: string): Promise<User[]> {
    try {
      if (account) {
        return await this.userRepository.createQueryBuilder('user').where("user.account = :account", { account: account }).getMany();
      } else {
        return await this.userRepository.find();
      }
    } catch (error) {
      logger.error(`findAll: ${error}`);
      throw new BadRequestException;
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail(id);
    } catch (error) {
      logger.error(`findOne: ${error}`);
      throw new BadRequestException;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findOne(id);
      if (user) {
        const updateResult = await this.userRepository.update({ id: user.id }, updateUserDto);
        if (updateResult) {
          return await this.findOne(user.id);
        } else {
          throw new InternalServerErrorException;
        }
      } else {
        throw new NotFoundException;
      }
    } catch (error) {
      logger.error(`update: ${error}`);
      throw new BadRequestException;
    }
  }

  async remove(id: number): Promise<User> {
    try {
      const user = await this.findOne(id);
      if (user) {
        return await this.userRepository.remove(user);
      } else {
        throw new NotFoundException
      }
    } catch (error) {
      logger.error(`remove: ${error}`);
      throw new BadRequestException;
    }
  }
}
