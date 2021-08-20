import { IsNotEmpty } from "class-validator";

export class UserLoginRequestDto {  
    @IsNotEmpty()
    readonly account: string;

    @IsNotEmpty()
    readonly password: string;
}