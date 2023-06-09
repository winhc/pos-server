import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsAlphanumeric, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { UserType } from 'src/user-type/entities/user-type.entity';
import { CreateUserDto } from './create-user.dto';
export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    user_name: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    @MinLength(6)
    @MaxLength(8)
    @ApiProperty({ required: true })
    account: string;

    @ApiProperty({ required: false })
    user_type?: UserType;

    @ApiProperty({ required: false })
    remarks?: string;

    @ApiProperty({ type: 'string', format: 'date-time', required: false })
    updated_at?: Date;
}
