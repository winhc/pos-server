import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { ProductModule } from 'src/product/product.module';
import { SupplierModule } from 'src/supplier/supplier.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    AuthModule,
    TypeOrmModule.forFeature([Purchase]),
    ProductModule,
    SupplierModule
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService]
})
export class PurchaseModule {}
