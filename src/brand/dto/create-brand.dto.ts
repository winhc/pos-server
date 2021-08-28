import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBrandDto {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    brand_name: string;

    @ApiProperty({ required: false })
    @IsString()
    remarks?: string;

    @ApiProperty({type: 'string', format: 'date-time', required: true})
    @IsNotEmpty()
    created_at: Date;
}
