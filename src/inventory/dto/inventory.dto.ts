import { ApiProperty } from "@nestjs/swagger";
import { ProductDto } from "src/product/dto/product.dto";
import { StoreDto } from "src/store/dto/store.dto";

export class InventoryDto {
    @ApiProperty()
    product: ProductDto;

    @ApiProperty()
    store: StoreDto;
}