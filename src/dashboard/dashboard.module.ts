import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Sale } from 'src/sale/entities/sale.entity';
import { Product } from 'src/product/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserType } from 'src/user-type/entities/user-type.entity';

@Module({
  imports:[
    AuthModule,
    TypeOrmModule.forFeature([Sale,Product, UserType]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
