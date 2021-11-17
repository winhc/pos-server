import { ApiProperty } from "@nestjs/swagger";
import { Customer } from "src/customer/entities/customer.entity";
import { Product } from "src/product/entities/product.entity";
import { Sale } from "src/sale/entities/sale.entity";

export class OrderModel {
    @ApiProperty()
    id: number;

    @ApiProperty()
    order_code: string;

    @ApiProperty()
    product: Product;

    @ApiProperty()
    sale: Sale;

    @ApiProperty()
    status: string;

    @ApiProperty()
    customer: Customer;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    price: number;

    @ApiProperty()
    remarks: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;
}