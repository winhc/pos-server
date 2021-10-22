import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSupplierDto {

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    supplier_name: string;

    @ApiProperty({ required: false })
    phone?: string;

    @ApiProperty({ required: false })
    address?: string;

    @ApiProperty({ required: false })
    remarks?: string;

    @ApiProperty({ required: false })
    created_at?: Date;
}
