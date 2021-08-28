import { BrandDto } from "src/brand/dto/brand.dto";
import { Brand } from "src/brand/entities/brand.entity";

export const toBrandDto = (data: Brand): BrandDto => {  
    const { id, brand_name, remarks, created_at, updated_at } = data;
    let brandDto: BrandDto = { id, brand_name, remarks, created_at, updated_at};
    return brandDto;
};
