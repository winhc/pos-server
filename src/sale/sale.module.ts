import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Order } from 'src/order/entities/order.entity';

@Module({
  imports:[
    AuthModule,
    TypeOrmModule.forFeature([Sale, Order])
  ],
  controllers: [SaleController],
  providers: [SaleService],
  exports: [SaleService]
})
export class SaleModule {}
