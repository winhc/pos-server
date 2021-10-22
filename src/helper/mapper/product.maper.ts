import { ProductDto } from "src/product/dto/product.dto";
import { Product } from "src/product/entities/product.entity";
import { ProductModel } from "../model/product.model";

export const toProductModel = (data: Product): ProductModel => {
    const { id, product_code, product_name, image, category, product_type, brand, supplier, buy_unit_price, sell_unit_price, expiry_at, tax, quantity, alert_quantity, for_sale, remarks, created_at, updated_at } = data;
    let productModel: ProductModel = { id, product_code, product_name, image, category, product_type, brand, supplier, buy_unit_price, sell_unit_price, expiry_at, tax, quantity, alert_quantity, for_sale, remarks, created_at, updated_at };
    return productModel;
};

export const toProductDto = (data: ProductModel[] | ProductModel, count?: number): ProductDto => {
    const productDto: ProductDto = {data, count};
    return productDto;
}