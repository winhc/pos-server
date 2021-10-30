import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { SupplierProductModel } from "src/helper/model/supplier-product.model";

export class SupplierProductDto {
    @ApiProperty({type: SupplierProductModel,isArray: true})
    @IsNotEmpty()
    data: SupplierProductModel[] | SupplierProductModel;

    @ApiProperty()
    count?: number;
}