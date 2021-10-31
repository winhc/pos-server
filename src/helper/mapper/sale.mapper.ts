import { SaleDto } from "src/sale/dto/sale.dto";
import { Sale } from "src/sale/entities/sale.entity";
import { SaleModel } from "../model/sale.model";

export const toSaleModel = (data: Sale): SaleModel => {
    const { id, order_code, user, total_amount, pay, refund, remarks, created_at, updated_at } = data;
    let saleModel: SaleModel = { id, order_code, user, total_amount, pay, refund, remarks, created_at, updated_at };
    return saleModel;
};

export const toSaleDto = (data: SaleModel[] | SaleModel, count?: number): SaleDto => {
    const orderDto: SaleDto = { data, count };
    return orderDto;
}