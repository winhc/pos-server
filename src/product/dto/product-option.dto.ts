import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { BrandDto } from "src/brand/dto/brand.dto";
import { CategoryDto } from "src/category/dto/category.dto";
import { ProductTypeDto } from "src/product-type/dto/product-type.dto";
import { StoreDto } from "src/store/dto/store.dto";
import { SupplierDto } from "src/supplier/dto/supplier.dto";

export class ProductOptionDto {
    @ApiProperty()
    @IsNotEmpty()
    brand: BrandDto

    @ApiProperty()
    @IsNotEmpty()
    category: CategoryDto

    @ApiProperty()
    @IsNotEmpty()
    product_type: ProductTypeDto

    @ApiProperty()
    @IsNotEmpty()
    supplier: SupplierDto

    @ApiProperty()
    @IsNotEmpty()
    store: StoreDto
}