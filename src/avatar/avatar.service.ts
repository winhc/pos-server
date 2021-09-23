import { Injectable } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class AvatarService {
    constructor(private readonly categoryService: CategoryService){}

    async findCategoryImage(id: number): Promise<String>{
        return (await this.categoryService.findById(id)).image_url;
    }
}
