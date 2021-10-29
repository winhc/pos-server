import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ProductTypeDto } from "src/product-type/dto/product-type.dto";
import { ProductDto } from "src/product/dto/product.dto";
import { SupplierDto } from "src/supplier/dto/supplier.dto";

export class ImportProductOptionDto {

    @ApiProperty()
    @IsNotEmpty()
    product: ProductDto;

    @ApiProperty()
    @IsNotEmpty()
    product_type: ProductTypeDto;

    @ApiProperty()
    @IsNotEmpty()
    supplier: SupplierDto;
}