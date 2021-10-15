import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { BrandModel } from "./brand.model";
import { CategoryModel } from "./category.model";
import { ProductTypeModel } from "./product-type.model";

export class ProductModel {
    @ApiProperty()
    @IsNotEmpty()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    product_code: string;

    @ApiProperty()
    @IsNotEmpty()
    product_name: string;

    @ApiProperty()
    image: string;

    @ApiProperty()
    @IsNotEmpty()
    category: {};

    @ApiProperty()
    @IsNotEmpty()
    product_type: ProductTypeModel;

    @ApiProperty()
    @IsNotEmpty()
    brand: BrandModel;

    @ApiProperty()
    @IsNotEmpty()
    buy_unit_price: number;

    @ApiProperty()
    @IsNotEmpty()
    sell_unit_price: number;

    @ApiProperty()
    @IsNotEmpty()
    expiry_at: Date;

    @ApiProperty()
    @IsNotEmpty()
    tax: number;

    @ApiProperty()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty()
    @IsNotEmpty()
    alert_quantity: number;

    @ApiProperty()
    @IsNotEmpty()
    for_sale: boolean;

    @ApiProperty()
    @IsNotEmpty()
    remarks: string;
    
    @ApiProperty()
    @IsNotEmpty()
    created_at: Date;

    @ApiProperty()
    @IsNotEmpty()
    updated_at: Date;
}