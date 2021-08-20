import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsAlpha } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @IsAlpha()
    @ApiProperty({ required: true })
    name: string;

    @ApiProperty({ required: false })
    remarks?: string;

    @ApiProperty({type: 'string', format: 'date-time', required: true})
    updated_at: Date;
}
