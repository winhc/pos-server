import { ApiProperty } from "@nestjs/swagger"
import { IsAlphanumeric, IsNotEmpty, MaxLength, MinLength } from "class-validator"

export class UpdatePasswordDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsAlphanumeric()
    @MinLength(6)
    @MaxLength(8)
    current_password: string

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsAlphanumeric()
    @MinLength(6)
    @MaxLength(8)
    new_password: string
}