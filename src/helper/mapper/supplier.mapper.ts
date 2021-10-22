import { SupplierDto } from "src/supplier/dto/supplier.dto";
import { Supplier } from "src/supplier/entities/supplier.entity";
import { SupplierModel } from "../model/supplier.model";

export const toSupplierModel = (data: Supplier): SupplierModel => {
    const { id, supplier_name, phone, address, remarks, created_at, updated_at, products } = data;
    const supplierModel: SupplierModel = { id, supplier_name, phone, address, remarks, created_at, updated_at, products };
    return supplierModel;
};

export const toSupplierDto = (data: SupplierModel[] | SupplierModel, count?: number): SupplierDto => {
    const supplierDto: SupplierDto = { data, count };
    return supplierDto;
};