import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserTypeDto {

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    user_role: string;

    @ApiProperty({ required: false })
    remarks?: string;

    @ApiProperty({ required: false })
    created_at?: Date;
}
