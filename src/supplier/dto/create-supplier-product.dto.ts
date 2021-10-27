import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ProductType } from "src/product-type/entities/product-type.entity";
import { Product } from "src/product/entities/product.entity";
import { Supplier } from "../entities/supplier.entity";

export class CreateSupplierProductDto {

    @ApiProperty({ required: true })
    @IsNotEmpty()
    product: Product;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    supplier: Supplier;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    product_type: ProductType;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    cost: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    alert_quantity: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    expiry_at: Date;

    @ApiProperty({ required: false })
    remarks?: string;
}
