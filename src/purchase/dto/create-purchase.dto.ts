import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Product } from "src/product/entities/product.entity";
import { Supplier } from "src/supplier/entities/supplier.entity";

export class CreatePurchaseDto {

    @ApiProperty({ type: Supplier })
    @IsNotEmpty()
    supplier: Supplier;

    @ApiProperty({ type: Product })
    @IsNotEmpty()
    product: Product;

    @ApiProperty({ nullable: false })
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({ nullable: false })
    @IsNotEmpty()
    cost: number;

    @ApiProperty({ nullable: true })
    remarks?: string;
}
