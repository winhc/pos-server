import { CategoryDto } from "src/category/dto/category.dto";
import { Category } from "src/category/entities/category.entity";
import { CategoryModel } from "src/helper/model/category.model";

export const toCategoryModel = (data: Category): CategoryModel => {
    const { id, category_code, category_name, image, remarks, created_at, updated_at } = data;
    const categoryModel: CategoryModel = { id, category_code, category_name, image, remarks, created_at, updated_at };
    return categoryModel;
};

export const toCategoryDto = (data: CategoryModel[] | CategoryModel, count?: number): CategoryDto => {
    const categoryDto: CategoryDto = { data, count };
    return categoryDto;
};