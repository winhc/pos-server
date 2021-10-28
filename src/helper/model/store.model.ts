import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { StoreProduct } from "src/store/entities/store-product.entity";

export class StoreModel {
    @ApiProperty()
    @IsNotEmpty()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    store_name: string;

    @ApiProperty()
    @IsNotEmpty()
    address: string;

    @ApiProperty()
    remarks: string;

    @ApiProperty()
    @IsNotEmpty()
    created_at: Date;

    @ApiProperty()
    @IsNotEmpty()
    updated_at: Date;

    @ApiProperty()
    @IsNotEmpty()
    store_products: StoreProduct[];
}