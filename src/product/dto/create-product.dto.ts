import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Brand } from "src/brand/entities/brand.entity";
import { Category } from "src/category/entities/category.entity";
import { ProductType } from "src/product-type/entities/product-type.entity";
import { Store } from "src/store/entities/store.entity";
import { Supplier } from "src/supplier/entities/supplier.entity";

// pre-define create product data
export class CreateProductDto {
    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsString()
    product_code: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsString()
    product_name: string;

    @ApiProperty({required: false})
    image?: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
    category: Category;

    @ApiProperty({required: true})
    @IsNotEmpty()
    brand: Brand;

    @ApiProperty({required: false})
    remarks?: string;
    
    @ApiProperty({required: false})
    created_at?: Date;
}
