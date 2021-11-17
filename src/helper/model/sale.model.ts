import { ApiProperty } from "@nestjs/swagger";
import { Order } from "src/order/entities/order.entity";
import { User } from "src/user/entities/user.entity";
import { OrderModel } from "./order.model";

export class SaleModel {
    @ApiProperty()
    id: number;

    @ApiProperty()
    orders: Order[];

    @ApiProperty()
    sale_code: string;

    @ApiProperty()
    user: User;

    @ApiProperty()
    total_amount: number;

    @ApiProperty()
    pay: number;

    @ApiProperty()
    refund: number;

    @ApiProperty()
    remarks: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;
}