import { ApiProperty } from "@nestjs/swagger";
import { ProductDto } from "src/product/dto/product.dto";
import { SupplierDto } from "src/supplier/dto/supplier.dto";

export class PurchaseOptionDto {
    @ApiProperty({ type: ProductDto })
    product: ProductDto;

    @ApiProperty({ type: SupplierDto })
    supplier: SupplierDto;
}