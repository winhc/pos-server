import { OrderDto } from "src/order/dto/order.dto";
import { Order } from "src/order/entities/order.entity";
import { OrderModel } from "../model/order.model";

export const toOrderModel = (data: Order): OrderModel => {
    const { id, order_code, product, status, customer, quantity, price, remarks, created_at, updated_at } = data;
    let orderModel: OrderModel = { id, order_code, product, status, customer, quantity, price, remarks, created_at, updated_at };
    return orderModel;
};

export const toOrderDto = (data: OrderModel[] | OrderModel, count?: number): OrderDto => {
    const orderDto: OrderDto = { data, count };
    return orderDto;
}