import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    remarks?: string;

    @ApiProperty({ type: 'string', format: 'date-time', required: true })
    @IsNotEmpty()
    updated_at: Date;
}
