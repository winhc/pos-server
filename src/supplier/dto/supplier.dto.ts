import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { SupplierModel } from "src/helper/model/supplier.model";

export class SupplierDto {

    @ApiProperty({type: SupplierModel,isArray: true})
    @IsNotEmpty()
    data: SupplierModel[] | SupplierModel;

    @ApiProperty()
    count?: number;
}
