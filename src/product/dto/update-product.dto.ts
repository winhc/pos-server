import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Brand } from 'src/brand/entities/brand.entity';
import { Category } from 'src/category/entities/category.entity';
import { ProductType } from 'src/product-type/entities/product-type.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsString()
    bar_code: string;

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

    @ApiProperty({required: true})
    @IsNotEmpty()
    product_type: ProductType;

    @ApiProperty({required: true})
    @IsNotEmpty()
    supplier: Supplier ;

    @ApiProperty({required: true})
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({required: true})
    @IsNotEmpty()
    cost: number;

    @ApiProperty({required: true})
    @IsNotEmpty()
    alert_quantity: number;

    @ApiProperty({required: false})
    expiry_at?: Date;
    
    @ApiProperty({required: false})
    remarks?: string;

    @ApiProperty({ required: false })
    updated_at?: Date;
}
