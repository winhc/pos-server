import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProductTypeDto {
    @ApiProperty()
    @IsNotEmpty()
    protuct_type_name: string;

    @ApiProperty()
    remarks: string;
    
    @ApiProperty()
    @IsNotEmpty()
    created_at: Date;
}
