import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Brand } from "src/brand/entities/brand.entity";
import { Category } from "src/category/entities/category.entity";
import { ProductType } from "src/product-type/entities/product-type.entity";
import { Supplier } from "src/supplier/entities/supplier.entity";
import { BrandModel } from "./brand.model";
import { CategoryModel } from "./category.model";
import { ProductTypeModel } from "./product-type.model";
import { SupplierModel } from "./supplier.model";

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
    category: Category;

    @ApiProperty()
    @IsNotEmpty()
    product_type: ProductType;

    @ApiProperty()
    @IsNotEmpty()
    brand: Brand;

    @ApiProperty()
    @IsNotEmpty()
    supplier: Supplier;

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