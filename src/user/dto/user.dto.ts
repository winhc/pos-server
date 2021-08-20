import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsAlphanumeric, MaxLength } from "class-validator";
import UserType from "../enum/user.type";

export class UserDto {

    @IsAlpha()
    @ApiProperty({ required: true })
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

    @ApiProperty({ required: false })
    remarks?: string;

    @ApiProperty({type: 'string', format: 'date-time', required: true})
    created_at: Date;

    @ApiProperty({type: 'string', format: 'date-time', required: true})
    updated_at: Date;
}
