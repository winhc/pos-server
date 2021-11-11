import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { PurchaseModel } from "src/helper/model/purchase.model";

export class PurchaseDto {
    @ApiProperty({type: PurchaseModel,isArray: true})
    @IsNotEmpty()
    data: PurchaseModel[] | PurchaseModel;

    @ApiProperty()
    count?: number;
}