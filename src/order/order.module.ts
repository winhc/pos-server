import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Order])
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule { }
