import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsAlphanumeric, IsNotEmpty, MaxLength } from "class-validator";
import UserType from "../enum/user.type";

export class CreateUserDto {

    @IsNotEmpty()
    @IsAlpha()
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

    @ApiProperty({type: 'string', format: 'date-time', required: true})
    created_at: Date;
}
