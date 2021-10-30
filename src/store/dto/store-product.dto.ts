import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { StoreProductModel } from "src/helper/model/store-product.model";

export class StoreProductDto {
    @ApiProperty({type: StoreProductModel,isArray: true})
    @IsNotEmpty()
    data: StoreProductModel[] | StoreProductModel;

    @ApiProperty()
    count?: number;
}