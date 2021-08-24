import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsAlphanumeric, IsNotEmpty, MaxLength } from "class-validator";

export class CategoryDto {

    @ApiProperty()
    @IsNotEmpty()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    image_url: string;

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
