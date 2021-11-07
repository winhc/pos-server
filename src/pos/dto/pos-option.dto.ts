import { ApiProperty } from "@nestjs/swagger";
import { CategoryDto } from "src/category/dto/category.dto";
import { CustomerDto } from "src/customer/dto/customer.dto";

export class POSOptionDto {
    @ApiProperty()
    category: CategoryDto;

    @ApiProperty()
    customer: CustomerDto;
}