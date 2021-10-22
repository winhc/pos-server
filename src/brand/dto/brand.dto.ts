import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { BrandModel } from "../../helper/model/brand.model";

export class BrandDto {
    @ApiProperty({type: BrandModel,isArray: true})
    @IsNotEmpty()
    data: BrandModel[] | BrandModel;

    @ApiProperty()
    count?: number;
}