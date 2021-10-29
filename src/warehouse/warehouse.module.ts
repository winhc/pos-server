import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { AuthModule } from 'src/auth/auth.module';
import { SupplierModule } from 'src/supplier/supplier.module';

@Module({
  imports:[
    AuthModule,
    SupplierModule
  ],
  controllers: [WarehouseController],
  providers: [WarehouseService]
})
export class WarehouseModule {}
