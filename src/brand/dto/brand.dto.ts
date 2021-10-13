import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { BrandModel } from "../../helper/model/brand.model";

export class BrandDto {
    @ApiProperty()
    @IsNotEmpty()
    data: BrandModel[] | BrandModel;

    @ApiProperty()
    @IsNotEmpty()
    count: number;
}