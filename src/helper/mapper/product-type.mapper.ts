import { ProductTypeDto } from "src/product-type/dto/product-type.dto";
import { ProductType } from "src/product-type/entities/product-type.entity";
import { ProductTypeModel } from "../model/product-type.model";

export const toProductTypeModel = (data: ProductType): ProductTypeModel => {
    const { id, unit, remarks, created_at, updated_at } = data;
    let productTypeModel: ProductTypeModel = { id, unit, remarks, created_at, updated_at };
    return productTypeModel;
};

export const toProductTypeDto = (data: ProductTypeModel[] | ProductTypeModel, count?: number): ProductTypeDto => {
    const productTypeDto: ProductTypeDto = { data, count };
    return productTypeDto;
}
