import { IsAlpha, IsAlphanumeric, IsNotEmpty } from "class-validator";
import UserType from "../enum/user.type";

export class UserLoginReplyDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    account: string;

    @IsNotEmpty()
    type: UserType;
}