import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { BrandDto } from "src/brand/dto/brand.dto";
import { CategoryDto } from "src/category/dto/category.dto";

export class ProductOptionDto {

    @ApiProperty()
    @IsNotEmpty()
    brand: BrandDto

    @ApiProperty()
    @IsNotEmpty()
    category: CategoryDto
}