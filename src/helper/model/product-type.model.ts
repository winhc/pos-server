import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ProductModel } from "./product.model";

export class ProductTypeModel {
    @ApiProperty()
    @IsNotEmpty()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    unit: string;

    @ApiProperty()
    remarks: string;
    
    @ApiProperty()
    @IsNotEmpty()
    created_at: Date;

    @ApiProperty()
    @IsNotEmpty()
    updated_at: Date;
}