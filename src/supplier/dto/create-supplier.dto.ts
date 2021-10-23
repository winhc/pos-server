import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateSupplierDto {

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    supplier_name: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    @MaxLength(11)
    phone: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiProperty({ required: false })
    remarks?: string;

    @ApiProperty({ required: false })
    created_at?: Date;
}
