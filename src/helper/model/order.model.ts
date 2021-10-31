import { ApiProperty } from "@nestjs/swagger";
import { Customer } from "src/customer/entities/customer.entity";
import { Product } from "src/product/entities/product.entity";

export class OrderModel {
    @ApiProperty()
    id: number;

    @ApiProperty()
    order_code: string;

    @ApiProperty()
    product: Product;

    @ApiProperty()
    status: string;

    @ApiProperty()
    customer: Customer;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    remarks: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;
}