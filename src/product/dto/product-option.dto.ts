import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { BrandDto } from "src/brand/dto/brand.dto";
import { CategoryDto } from "src/category/dto/category.dto";
import { ProductTypeDto } from "src/product-type/dto/product-type.dto";

export class ProductOptionDto {

    @ApiProperty()
    @IsNotEmpty()
    category: CategoryDto

    @ApiProperty()
    @IsNotEmpty()
    brand: BrandDto

    @ApiProperty()
    @IsNotEmpty()
    product_type: ProductTypeDto
}