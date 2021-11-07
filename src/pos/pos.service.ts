import { Injectable } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { CustomerService } from 'src/customer/customer.service';
import { POSOptionDto } from './dto/pos-option.dto';

@Injectable()
export class PosService {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly customerService: CustomerService,
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
}
