import { ProductTypeDto } from "src/product-type/dto/product-type.dto";
import { ProductType } from "src/product-type/entities/product-type.entity";

export const toProductTypeDto = (data: ProductType): ProductTypeDto => {
    const { id, protuct_type_name, remarks, created_at, updated_at } = data;
    let productTypeDto: ProductTypeDto = { id, protuct_type_name, remarks, created_at, updated_at };
    return productTypeDto;
};
