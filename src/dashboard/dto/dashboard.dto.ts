import { ApiProperty } from "@nestjs/swagger";
import { ProductDto } from "src/product/dto/product.dto";
import { SaleDto } from "src/sale/dto/sale.dto";
import { UserTypeDto } from "src/user-type/dto/user-type-dto";

export class DashboardDto {
    @ApiProperty()
    sale: SaleDto;

    @ApiProperty()
    product: ProductDto;

    @ApiProperty()
    purchase: ProductDto;

    @ApiProperty()
    user: UserTypeDto;
}