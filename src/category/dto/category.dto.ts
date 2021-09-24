import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CategoryDto {

    @ApiProperty()
    @IsNotEmpty()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    category_code: string;

    @ApiProperty()
    @IsNotEmpty()
    category_name: string;

    @ApiProperty()
    image: string;

    @ApiProperty()
    @IsNotEmpty()
    remarks?: string;

    @ApiProperty()
    @IsNotEmpty()
    created_at: Date;

    @ApiProperty()
    @IsNotEmpty()
    updated_at: Date;
}
