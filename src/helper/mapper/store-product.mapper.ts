import { StoreProductDto } from "src/store/dto/store-product.dto";
import { StoreProduct } from "src/store/entities/store-product.entity";
import { StoreProductModel } from "../model/store-product.model";

export const toStoreProductModel = (data: StoreProduct): StoreProductModel => {
    const { id, bar_code, product, store, product_type, quantity, price, tax, alert_quantity, created_at, updated_at, remarks } = data;
    let storeProductModel: StoreProductModel = { id, bar_code, product, store, product_type, quantity, price, tax, alert_quantity, created_at, updated_at, remarks };
    return storeProductModel;
};

export const toStoreProductDto = (data: StoreProductModel[] | StoreProductModel, count?: number): StoreProductDto => {
    const storeProductDto: StoreProductDto = { data, count };
    return storeProductDto;
}