import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductTypeDto {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    product_type_name: string;

    @ApiProperty({ required: false })
    @IsString()
    remarks?: string;

    @ApiProperty({ type: 'string', format: 'date-time', required: false })
    created_at?: Date;
}
