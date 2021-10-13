import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    category_name: string;

    @ApiProperty({ required: false })
    image?: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    remarks: string;

    @ApiProperty({ type: 'string', format: 'date-time', required: false })
    updated_at: Date;
}
