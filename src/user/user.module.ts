import { Module } from '@nestjs/common';
import { UserService } from './user.service';
// import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserTypeModule } from 'src/user-type/user-type.module';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule, UserTypeModule, CustomerModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
