import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { SaleModel } from "src/helper/model/sale.model";

export class SaleDto {
    @ApiProperty({ type: SaleModel, isArray: true })
    @IsNotEmpty()
    data: SaleModel[] | SaleModel;

    @ApiProperty()
    count?: number;
}