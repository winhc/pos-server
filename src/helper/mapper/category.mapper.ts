import { CategoryDto } from "src/category/dto/category.dto";
import { Category } from "src/category/entities/category.entity";
import { CategoryModel } from "src/category/model/category.model";

export const toCategoryModel = (data: Category): CategoryModel => {
    const { id, category_code, category_name, image, remarks, created_at, updated_at } = data;
    let categoryDto: CategoryModel = { id, category_code, category_name, image, remarks, created_at, updated_at };
    return categoryDto;
};

export const toCategoryDto = (data: CategoryModel[] | CategoryModel, count?: number): CategoryDto => {
    let categoryDto: CategoryDto = { data, count };
    return categoryDto;
};