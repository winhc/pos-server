import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { UserTypeModel } from "src/helper/model/user-type.model";

export class UserTypeDto {
    @ApiProperty({type: UserTypeModel,isArray: true})
    @IsNotEmpty()
    data: UserTypeModel[] | UserTypeModel;

    @ApiProperty()
    count?: number;
}
