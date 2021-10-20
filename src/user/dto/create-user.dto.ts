import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { UserType } from "src/user-type/entities/user-type.entity";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    name: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    @MaxLength(8)
    @ApiProperty({ required: true })
    account: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    @MinLength(6)
    @MaxLength(8)
    @ApiProperty({ required: true })
    password: string;

    @IsNotEmpty()
    @ApiProperty({ required: true })
    user_type: UserType;

    @ApiProperty({ required: false })
    remarks?: string;

    @ApiProperty({ type: 'string', format: 'date-time', required: false })
    created_at?: Date;
}
