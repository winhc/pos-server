import { CategoryDto } from "src/category/dto/category.dto";
import { Category } from "src/category/entities/category.entity";

export const toCategoryDto = (data: Category): CategoryDto => {  
    const { id, name, image_url, remarks, created_at, updated_at } = data;
    let categoryDto: CategoryDto = { id, name, image_url, remarks, created_at, updated_at};
    return categoryDto;
};