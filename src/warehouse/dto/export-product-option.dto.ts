import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ProductTypeDto } from "src/product-type/dto/product-type.dto";
import { ProductDto } from "src/product/dto/product.dto";
import { StoreDto } from "src/store/dto/store.dto";

export class ExportProductOptionDto {

    @ApiProperty()
    @IsNotEmpty()
    product: ProductDto

    @ApiProperty()
    @IsNotEmpty()
    product_type: ProductTypeDto;

    @ApiProperty()
    @IsNotEmpty()
    store: StoreDto
}