import { IsNotEmpty } from "class-validator";
import { UserType } from "src/user-type/entities/user-type.entity";

export class UserLoginReplyDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    account: string;

    @IsNotEmpty()
    user_type: UserType;
}