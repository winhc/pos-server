import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsNotEmpty, IsString, MaxLength } from "class-validator";
import UserType from "../../helper/constant/user-type.constant";

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
    @MaxLength(8)
    @ApiProperty({ required: true })
    password: string;

    @IsNotEmpty()
    @ApiProperty({ required: true })
    type: UserType;

    @ApiProperty({ required: false })
    remarks?: string;

    @ApiProperty({ type: 'string', format: 'date-time', required: true })
    created_at: Date;
}
