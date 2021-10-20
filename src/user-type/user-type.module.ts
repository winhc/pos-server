import { Module } from '@nestjs/common';
import { UserTypeService } from './user-type.service';
import { UserTypeController } from './user-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserType } from './entities/user-type.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([UserType]), AuthModule],
  controllers: [UserTypeController],
  providers: [UserTypeService],
  exports: [UserTypeService]
})
export class UserTypeModule {}
