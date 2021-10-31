import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { OrderModel } from "src/helper/model/order.model";

export class OrderDto {
    @ApiProperty({ type: OrderModel, isArray: true })
    @IsNotEmpty()
    data: OrderModel[] | OrderModel;

    @ApiProperty()
    count?: number;
}