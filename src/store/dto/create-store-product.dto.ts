import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ProductTypeModel } from "src/helper/model/product-type.model";
import { ProductModel } from "src/helper/model/product.model";
import { Store } from "../entities/store.entity";

export class CreateStoreProductDto {

    @ApiProperty({ required: true })
    @IsNotEmpty()
    bar_code: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    product: ProductModel;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    store: Store;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    product_type: ProductTypeModel;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    price: number;

    @ApiProperty({ required: false })
    tax?: number;

    @ApiProperty({ required: false })
    alert_quantity?: number;

    @ApiProperty({ required: false })
    remarks?: string;
}
