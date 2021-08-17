import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsAlphanumeric, MaxLength } from 'class-validator';
import UserType from '../enum/user.type';
import { CreateUserDto } from './create-user.dto';
export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsAlpha()
    @ApiProperty({ required: false })
    name: string;

    @IsAlphanumeric()
    @MaxLength(8)
    @ApiProperty({ required: true })
    account: string;

    @IsAlphanumeric()
    @MaxLength(8)
    @ApiProperty({ required: true })
    password: string;

    @ApiProperty({ required: true })
    type: UserType;

    @ApiProperty({ required: true })
    remarks?: string;

    @ApiProperty({type: 'string', format: 'date-time', required: false})
    updated_at?: Date;
}
