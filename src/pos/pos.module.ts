import { Module } from '@nestjs/common';
import { PosService } from './pos.service';
import { PosController } from './pos.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryModule } from 'src/category/category.module';
import { CustomerModule } from 'src/customer/customer.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports:[
    AuthModule,
    CategoryModule,
    CustomerModule,
    ProductModule
  ],
  controllers: [PosController],
  providers: [PosService]
})
export class PosModule {}
