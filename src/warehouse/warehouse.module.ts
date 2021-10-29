import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { AuthModule } from 'src/auth/auth.module';
import { SupplierModule } from 'src/supplier/supplier.module';
import { ProductModule } from 'src/product/product.module';
import { StoreModule } from 'src/store/store.module';
import { ProductTypeModule } from 'src/product-type/product-type.module';

@Module({
  imports:[
    AuthModule,
    SupplierModule,
    StoreModule,
    ProductModule,
    ProductTypeModule
  ],
  controllers: [WarehouseController],
  providers: [WarehouseService]
})
export class WarehouseModule {}
