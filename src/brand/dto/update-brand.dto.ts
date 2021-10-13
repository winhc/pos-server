import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateBrandDto } from './create-brand.dto';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    brand_name: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    remarks: string;

    @ApiProperty({type: 'string', format: 'date-time', required: false})
    updated_at?: Date;
}
