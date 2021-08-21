import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toUserLoginReplyDto } from 'src/helper/user.mapper';
import { comparePasswords } from 'src/helper/utils';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserLoginReplyDto } from './dto/user-login-reply.dto';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { User } from './entities/user.entity';
const logger = new Logger('UserService');
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

  // async create(createUserDto: CreateUserDto): Promise<User> {
  //   try {
  //     logger.log(`createUserDto=> ${createUserDto}`)
  //     const user = this.userRepository.create(createUserDto);
  //     return await this.userRepository.save(user);
  //   } catch (error) {
  //     logger.error(`create: ${error}`);
  //     throw new BadRequestException;
  //   }
  // }

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

  async findAccount(options?: object): Promise<UserLoginReplyDto> {
    const user = await this.userRepository.findOne(options);
    return toUserLoginReplyDto(user);
  }

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

  async findByPayload({ account }: any): Promise<UserLoginReplyDto> {
    return await this.findAccount({ where: { account } });
  }

  async create(createUserDto: CreateUserDto): Promise<UserLoginReplyDto> {
    const { account } = createUserDto;
    // logger.log(`account: ${account}`);
    const userInDb = await this.userRepository.findOne({ where: {account} });
    // logger.log(`userInDb: ${userInDb}`);
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const user: User = await this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return toUserLoginReplyDto(user);
  }

  // async findAccount(account: string): Promise<User> {
  //   try {
  //     return await this.userRepository.createQueryBuilder('user').where("user.account = :account", { account: account }).getOneOrFail();
  //   } catch (error) {
  //     logger.error(`findAccount: ${error}`);
  //     throw new BadRequestException;
  //   }
  // }

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
