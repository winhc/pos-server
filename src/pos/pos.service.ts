import { Injectable } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { CustomerService } from 'src/customer/customer.service';
import { ProductDto } from 'src/product/dto/product.dto';
import { ProductService } from 'src/product/product.service';
import { POSOptionDto } from './dto/pos-option.dto';

@Injectable()
export class PosService {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly customerService: CustomerService,
        private readonly productService: ProductService
    ) { }

    async findPOSOption(): Promise<POSOptionDto> {
        const category = await this.categoryService.findAll();
        const customer = await this.customerService.findAll();
        const posOptionDto: POSOptionDto = {
            category,
            customer
        }
        return posOptionDto;
    }

    async findProductShop(category_id?: number, product_name?: string): Promise<ProductDto> {
        return this.productService.findProductShop(category_id,product_name);
    }
}
