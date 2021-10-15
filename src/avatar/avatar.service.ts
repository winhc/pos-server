import { Injectable } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class AvatarService {
    constructor(private readonly categoryService: CategoryService,
        private readonly productService: ProductService) { }

    async findCategoryImage(id: number, name: string): Promise<String> {
        return (await this.categoryService.findImage(id, name)).data['image'];
    }

    async findProductImage(id: number, name: string): Promise<String> {
        return (await this.productService.findImage(id, name)).data['image'];
    }
}
