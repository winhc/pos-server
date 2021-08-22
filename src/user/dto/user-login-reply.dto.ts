import { IsAlpha, IsAlphanumeric, IsNotEmpty } from "class-validator";
import UserType from "../../helper/constant/user-type.constant";

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