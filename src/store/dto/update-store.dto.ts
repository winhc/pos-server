import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateStoreDto } from './create-store.dto';

export class UpdateStoreDto extends PartialType(CreateStoreDto) {
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
    updated_at?: Date;
}
