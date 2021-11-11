import { PurchaseDto } from "src/purchase/dto/purchase.dto";
import { Purchase } from "src/purchase/entities/purchase.entity";
import { PurchaseModel } from "../model/purchase.model";

export const toPurchaseModel = (data: Purchase): PurchaseModel => {
    const { id, supplier, product, quantity, cost, remarks, created_at, updated_at } = data;
    const brandModel: PurchaseModel = { id, supplier, product, quantity, cost, remarks, created_at, updated_at };
    return brandModel;
};

export const toPurchaseDto = (data: PurchaseModel[] | PurchaseModel, count?: number): PurchaseDto => {
    const purchaseDto: PurchaseDto = { data, count };
    return purchaseDto;
}
