import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ProductModule } from 'src/product/product.module';
import { StoreModule } from 'src/store/store.module';

@Module({
  imports:[
    AuthModule,
    ProductModule,
    StoreModule
  ],
  controllers: [InventoryController],
  providers: [InventoryService]
})
export class InventoryModule {}
