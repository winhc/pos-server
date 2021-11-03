import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UserModule } from 'src/user/user.module';
import { SaleModule } from 'src/sale/sale.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Order]),
    UserModule,
    SaleModule
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule { }
