import { ProductDto } from "src/product/dto/product.dto";
import { Product } from "src/product/entities/product.entity";

export const toProductDto = (data: Product): ProductDto => {
    const { id, product_code, product_name, image_url, category, product_type, brand, buy_unit_price, sell_unit_price, expiry_at, tax, quantity, alert_quantity, for_sale, remarks, created_at, updated_at } = data;
    let productDto: ProductDto = { id, product_code, product_name, image_url, category, product_type, brand, buy_unit_price, sell_unit_price, expiry_at, tax, quantity, alert_quantity, for_sale, remarks, created_at, updated_at };
    return productDto;
};
