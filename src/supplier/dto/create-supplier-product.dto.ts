import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ProductTypeModel } from "src/helper/model/product-type.model";
import { ProductModel } from "src/helper/model/product.model";
import { ProductType } from "src/product-type/entities/product-type.entity";
import { Product } from "src/product/entities/product.entity";
import { Supplier } from "../entities/supplier.entity";

export class CreateSupplierProductDto {

    @ApiProperty({ required: true })
    @IsNotEmpty()
    bar_code: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    product: ProductModel;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    supplier: Supplier;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    product_type: ProductTypeModel;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    cost: number;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    alert_quantity?: number;

    @ApiProperty({ required: false })
    expiry_at?: Date;

    @ApiProperty({ required: false })
    remarks?: string;

    @ApiProperty({ required: false })
    updated_at?: Date;
}
