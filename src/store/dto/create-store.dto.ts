import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateStoreDto {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    store_name: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({ required: false })
    @IsString()
    remarks?: string;

    @ApiProperty({type: 'string', format: 'date-time', required: false})
    created_at?: Date;
}
