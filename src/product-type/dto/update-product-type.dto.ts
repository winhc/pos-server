import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateProductTypeDto } from './create-product-type.dto';

export class UpdateProductTypeDto extends PartialType(CreateProductTypeDto) {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    product_type_name: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    remarks: string;

    @ApiProperty({ type: 'string', format: 'date-time', required: false })
    updated_at?: Date;
}
