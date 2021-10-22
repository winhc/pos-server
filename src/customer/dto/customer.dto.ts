import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { CustomerModel } from "src/helper/model/customer.model";

export class CustomerDto {

    @ApiProperty({type: CustomerModel,isArray: true})
    @IsNotEmpty()
    data: CustomerModel[] | CustomerModel;

    @ApiProperty()
    count?: number;
}
