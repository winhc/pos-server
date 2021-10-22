import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateSupplierDto } from './create-supplier.dto';

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {
    
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    supplier_name: string;

    @ApiProperty({ required: false })
    phone?: string;

    @ApiProperty({ required: false })
    address?: string;

    @ApiProperty({ required: false })
    remarks?: string;

    @ApiProperty({ required: false })
    updated_at?: Date;
}
