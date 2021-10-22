import { CustomerDto } from "src/customer/dto/customer.dto";
import { Customer } from "src/customer/entities/customer.entity";
import { CustomerModel } from "../model/customer.model";

export const toCustomerModel = (data: Customer): CustomerModel => {
    const { id, customer_name, phone, address, remarks, created_at, updated_at } = data;
    const customerModel: CustomerModel = { id, customer_name, phone, address, remarks, created_at, updated_at };
    return customerModel;
};

export const toCustomerDto = (data: CustomerModel[] | CustomerModel, count?: number): CustomerDto => {
    const customerDto: CustomerDto = { data, count };
    return customerDto;
};