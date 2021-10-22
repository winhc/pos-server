import { BrandDto } from "src/brand/dto/brand.dto";
import { Brand } from "src/brand/entities/brand.entity";
import { BrandModel } from "src/helper/model/brand.model";

export const toBrandModel = (data: Brand): BrandModel => {
    const { id, brand_name, remarks, created_at, updated_at, products } = data;
    const brandModel: BrandModel = { id, brand_name, remarks, created_at, updated_at, products };
    return brandModel;
};

export const toBrandDto = (data: BrandModel[] | BrandModel, count?: number): BrandDto => {
    const brandDto: BrandDto = { data, count };
    return brandDto;
}
