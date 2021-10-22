import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ProductModel } from "src/helper/model/product.model";

export class ProductDto {
    @ApiProperty({type: ProductModel,isArray: true})
    @IsNotEmpty()
    data: ProductModel[] | ProductModel;

    @ApiProperty()
    count?: number;
}