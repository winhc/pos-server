import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ProductTypeModel } from "src/helper/model/product-type.model";

export class ProductTypeDto {
    @ApiProperty({type: ProductTypeModel,isArray: true})
    @IsNotEmpty()
    data: ProductTypeModel[] | ProductTypeModel;

    @ApiProperty()
    count?: number;
}