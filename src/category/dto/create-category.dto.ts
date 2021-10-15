import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsAlphanumeric, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCategoryDto {

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    category_code: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    category_name: string;

    @ApiProperty({ required: false })
    image?: string;

    @ApiProperty({ required: false })
    @IsString()
    remarks?: string;

    @ApiProperty({ type: 'string', format: 'date-time', required: false })
    created_at?: Date;
}
