import { ApiProperty } from "@nestjs/swagger";
import { ProductDto } from "src/product/dto/product.dto";
import { PurchaseDto } from "src/purchase/dto/purchase.dto";
import { SaleDto } from "src/sale/dto/sale.dto";
import { UserDto } from "src/user/dto/user.dto";

export class DashboardDto {
    @ApiProperty()
    sale: SaleDto;
    
    @ApiProperty()
    product: ProductDto;

    @ApiProperty()
    purchase: ProductDto;

    @ApiProperty()
    user: UserDto;
}