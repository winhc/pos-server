import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'orm.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ProductTypeModule } from './product-type/product-type.module';
import { BrandModule } from './brand/brand.module';
import { AvatarModule } from './avatar/avatar.module';
import { UserTypeModule } from './user-type/user-type.module';
import { CustomerModule } from './customer/customer.module';
import { SupplierModule } from './supplier/supplier.module';
import { OrderModule } from './order/order.module';
import { SaleModule } from './sale/sale.module';
import { StoreModule } from './store/store.module';
import { PosModule } from './pos/pos.module';
import { PurchaseModule } from './purchase/purchase.module';
import { ReportModule } from './report/report.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env.dev','.env.prod']
    // envFilePath: ['process.env']
  }),
    UserModule,
  // TypeOrmModule.forRootAsync(
  //   {
  //     imports: [ConfigModule],
  //     useFactory: (configService: ConfigService) => ({
  //       type: "postgres",
  //       host: configService.get<string>('DATABASE_HOST'),
  //       port: configService.get<number>('DATABASE_PORT'),
  //       username: configService.get<string>('DATABASE_USER'),
  //       password: configService.get<string>('DATABASE_PASSWORD'),
  //       database: configService.get<string>('DATABASE_NAME'),
  //       entities: [__dirname + '/**/*.entity{.ts,.js}'],
  //       synchronize: configService.get<boolean>('SYNCHRONIZE'),
  //       // extra: {
  //       //   ssl: {
  //       //     rejectUnauthorized: false,
  //       //   }
  //       // }
  //     }),
  //     inject: [ConfigService]
  //   }
  // ),
  TypeOrmModule.forRoot(ormConfig),
    AuthModule,
    CategoryModule,
    ProductModule,
    ProductTypeModule,
    BrandModule,
    AvatarModule,
    UserTypeModule,
    CustomerModule,
    SupplierModule,
    OrderModule,
    SaleModule,
    StoreModule,
    PosModule,
    PurchaseModule,
    ReportModule,
    DashboardModule
  ]
})
export class AppModule { }
