import { ApiProperty } from "@nestjs/swagger";
import { UserModel } from "src/helper/model/user.model";
export class UserDto {

    @ApiProperty({type: UserModel, isArray: true})
    data: UserModel[] | UserModel;

    @ApiProperty()
    count?: number;
}
