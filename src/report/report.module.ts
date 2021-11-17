import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Sale } from 'src/sale/entities/sale.entity';
import { Order } from 'src/order/entities/order.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Product, Sale, Order])
  ],
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportModule {}
