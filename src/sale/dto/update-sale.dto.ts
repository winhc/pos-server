import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { CreateSaleDto } from './create-sale.dto';

export class UpdateSaleDto extends PartialType(CreateSaleDto) {
    @ApiProperty({required: true})
    @IsNotEmpty()
    sale_code: string;

    @ApiProperty({type: User, required: true})
    @IsNotEmpty()
    user: User;

    @ApiProperty({required: true})
    @IsNotEmpty()
    total_amount: number;

    @ApiProperty({required: true})
    @IsNotEmpty()
    pay: number;

    @ApiProperty({required: true})
    @IsNotEmpty()
    refund: number;

    @ApiProperty({required: false})
    remarks?: string;

    @ApiProperty({required: false})
    updated_at?: Date;
}
