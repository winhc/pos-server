import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Customer } from "src/customer/entities/customer.entity";
import { Product } from "src/product/entities/product.entity";

export class CreateOrderDto {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    order_code: string;

    // @ApiProperty({ required: true })
    // @IsNotEmpty()
    // product: Product;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    status: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    customer: Customer;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    amount: number;

    @ApiProperty({ required: false })
    remarks?: string;

    @ApiProperty({ required: false })
    created_at?: Date;
}
