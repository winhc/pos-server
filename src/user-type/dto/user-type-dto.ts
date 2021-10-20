import { ApiProperty } from "@nestjs/swagger";
import { UserTypeModel } from "src/helper/model/user-type.model";

export class UserTypeDto {
    @ApiProperty()
    data: UserTypeModel[] | UserTypeModel;

    @ApiProperty()
    count?: number;
}
