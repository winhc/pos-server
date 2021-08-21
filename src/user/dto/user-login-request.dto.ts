import { IsAlphanumeric, IsNotEmpty } from "class-validator";

export class UserLoginRequestDto {  
    @IsNotEmpty()
    @IsAlphanumeric()
    readonly account: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    readonly password: string;
}