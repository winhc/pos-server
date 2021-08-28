import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateProductTypeDto } from './create-product-type.dto';

export class UpdateProductTypeDto extends PartialType(CreateProductTypeDto) {
    @ApiProperty()
    @IsNotEmpty()
    protuct_type_name: string;

    @ApiProperty()
    @IsNotEmpty()
    remarks: string;

    @ApiProperty()
    @IsNotEmpty()
    updated_at: Date;
}
