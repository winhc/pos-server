import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsAlphanumeric, IsNotEmpty, MaxLength } from 'class-validator';
import UserType from '../../helper/constant/user-type.constant';
import { CreateUserDto } from './create-user.dto';
export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsAlpha()
    @ApiProperty({ required: false })
    name: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    @MaxLength(8)
    @ApiProperty({ required: true })
    account: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    @MaxLength(8)
    @ApiProperty({ required: true })
    password: string;

    @ApiProperty({ required: false })
    type: UserType;

    @IsNotEmpty()
    @ApiProperty({ required: true })
    remarks?: string;

    @IsNotEmpty()
    @ApiProperty({type: 'string', format: 'date-time', required: true})
    updated_at?: Date;
}
