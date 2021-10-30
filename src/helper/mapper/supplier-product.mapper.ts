import { SupplierProductDto } from "src/supplier/dto/supplier-product.dto";
import { SupplierProduct } from "src/supplier/entities/supplier-product.entity";
import { SupplierProductModel } from "../model/supplier-product.model";

export const toSupplierProductModel = (data: SupplierProduct): SupplierProductModel => {
    const { id, bar_code, product, supplier, product_type, quantity, cost, alert_quantity, expiry_at, created_at, updated_at, remarks } = data;
    let suppplierProductModel: SupplierProductModel = { id, bar_code, product, supplier, product_type, quantity, cost, alert_quantity, expiry_at, created_at, updated_at, remarks };
    return suppplierProductModel;
};

export const toSupplierProductDto = (data: SupplierProductModel[] | SupplierProductModel, count?: number): SupplierProductDto => {
    const supplierProductDto: SupplierProductDto = { data, count };
    return supplierProductDto;
}