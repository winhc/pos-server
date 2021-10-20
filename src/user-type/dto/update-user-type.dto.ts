import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserTypeDto } from './create-user-type.dto';

export class UpdateUserTypeDto extends PartialType(CreateUserTypeDto) {

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    user_role: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    remarks: string;

    @ApiProperty({ required: false })
    updated_at?: Date;
}
