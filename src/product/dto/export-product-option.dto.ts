import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { BrandDto } from "src/brand/dto/brand.dto";
import { CategoryDto } from "src/category/dto/category.dto";
import { ProductTypeDto } from "src/product-type/dto/product-type.dto";
import { StoreDto } from "src/store/dto/store.dto";
import { SupplierDto } from "src/supplier/dto/supplier.dto";
import { ProductDto } from "./product.dto";

export class ExportProductOptionDto {

    @ApiProperty()
    @IsNotEmpty()
    product: ProductDto

    @ApiProperty()
    @IsNotEmpty()
    store: StoreDto
}