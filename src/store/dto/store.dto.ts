import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { StoreModel } from "src/helper/model/store.model";

export class StoreDto {
    @ApiProperty({type: StoreModel,isArray: true})
    @IsNotEmpty()
    data: StoreModel[] | StoreModel;

    @ApiProperty()
    count?: number;
}