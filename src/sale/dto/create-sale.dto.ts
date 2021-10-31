import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateSaleDto {

    @ApiProperty({required: true})
    @IsNotEmpty()
    order_code: string;

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
