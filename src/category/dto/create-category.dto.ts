import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsAlphanumeric, MaxLength } from "class-validator";

export class CreateCategoryDto {

    @IsAlpha()
    @ApiProperty({ required: true })
    name: string;

    @ApiProperty({ required: false })
    remarks?: string;

    @ApiProperty({type: 'string', format: 'date-time', required: true})
    created_at: Date;
}
