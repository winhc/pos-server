import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Order } from "src/order/entities/order.entity";
import { User } from "src/user/entities/user.entity";

export class CreateSaleDto {

    @ApiProperty({required: true})
    @IsNotEmpty()
    sale_code: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
    orderIds: number[];

    @ApiProperty({type: User, required: true})
    @IsNotEmpty()
    user: User;

    @ApiProperty({required: true})
    @IsNotEmpty()
    total_amount: number;

    @ApiProperty({required: true})
    @IsNotEmpty()
    pay: number;

    @ApiProperty({required: true})
    @IsNotEmpty()
    refund: number;

    @ApiProperty({required: false})
    remarks?: string;
}
