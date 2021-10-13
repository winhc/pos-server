import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { CategoryModel } from "../../helper/model/category.model";

export class CategoryDto {

    @ApiProperty()
    @IsNotEmpty()
    data: CategoryModel[] | CategoryModel;

    @ApiProperty()
    count?: number;
}
