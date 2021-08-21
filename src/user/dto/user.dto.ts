import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsAlphanumeric, IsNotEmpty, MaxLength } from "class-validator";
import UserType from "../enum/user.type";

export class UserDto {

    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    account: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    type: UserType;

    remarks?: string;

    @IsNotEmpty()
    created_at: Date;

    @IsNotEmpty()
    updated_at: Date;
}
