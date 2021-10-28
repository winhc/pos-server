import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { StoreService } from 'src/store/store.service';
import { InventoryDto } from './dto/inventory.dto';

@Injectable()
export class InventoryService {
    constructor(
        private readonly productService: ProductService,
        private readonly storeService: StoreService,
    ) { }

    async findAll(): Promise<InventoryDto> {
        const product = await this.productService.findAll();
        const store = await this.storeService.findAll();
        const inventoryDto: InventoryDto = { product, store };
        return inventoryDto;
    }
}
