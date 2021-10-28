import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ProductType } from "src/product-type/entities/product-type.entity";
import { Product } from "src/product/entities/product.entity";
import { Store } from "../entities/store.entity";

export class CreateStoreProductDto {

    @ApiProperty({ required: true })
    @IsNotEmpty()
    product: Product;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    store: Store;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    product_type: ProductType;

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
