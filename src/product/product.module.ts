import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { AuthModule } from 'src/auth/auth.module';
import { BrandModule } from 'src/brand/brand.module';
import { CategoryModule } from 'src/category/category.module';
import { ProductTypeModule } from 'src/product-type/product-type.module';
import { SupplierModule } from 'src/supplier/supplier.module';

@Module({
  imports: [AuthModule,
    TypeOrmModule.forFeature([Product]),
    BrandModule,
    CategoryModule,
    ProductTypeModule,
    SupplierModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule { }
