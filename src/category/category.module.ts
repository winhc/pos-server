import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './files'
    }),
    UserModule,
    AuthModule,
    TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule { }
