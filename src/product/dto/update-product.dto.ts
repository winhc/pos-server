import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Brand } from 'src/brand/entities/brand.entity';
import { Category } from 'src/category/entities/category.entity';
import { ProductType } from 'src/product-type/entities/product-type.entity';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @ApiProperty()
    @IsNotEmpty()
    product_code: string;

    @ApiProperty()
    @IsNotEmpty()
    product_name: string;

    @ApiProperty()
    image_url: string;

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
    updated_at: Date;
}
