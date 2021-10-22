import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    customer_name: string;

    @ApiProperty({ required: false })
    phone?: string;

    @ApiProperty({ required: false })
    address?: string;

    @ApiProperty({ required: false })
    remarks?: string;

    @ApiProperty({ required: false })
    updated_at?: Date;
}
