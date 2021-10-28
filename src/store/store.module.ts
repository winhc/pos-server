import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { StoreProduct } from './entities/store-product.entity';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Store, StoreProduct, Product])
  ],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService]
})
export class StoreModule {}
