import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";

export class SaleModel {
    @ApiProperty()
    id: number;

    @ApiProperty()
    order_code: string;

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