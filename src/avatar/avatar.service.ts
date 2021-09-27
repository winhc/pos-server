import { Injectable } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class AvatarService {
    constructor(private readonly categoryService: CategoryService) { }

    async findCategoryImage(id: number, name: string): Promise<String> {
        return (await this.categoryService.findImage(id, name)).image;
    }
}
