import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'orm.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ProductTypeModule } from './product-type/product-type.module';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env.dev'],
  }),
    UserModule,
  TypeOrmModule.forRoot(ormConfig),
    AuthModule,
    CategoryModule,
    ProductModule,
    ProductTypeModule,
    BrandModule]
})
export class AppModule { }
