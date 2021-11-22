import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Sale } from 'src/sale/entities/sale.entity';
import { Product } from 'src/product/entities/product.entity';
import { Purchase } from 'src/purchase/entities/purchase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    AuthModule,
    TypeOrmModule.forFeature([Sale,Product, Purchase]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
