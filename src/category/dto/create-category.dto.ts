import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsAlphanumeric, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCategoryDto {

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsNotEmpty()
    remarks?: string;

    @ApiProperty({type: 'string', format: 'date-time', required: true})
    @IsNotEmpty()
    created_at: Date;
}
