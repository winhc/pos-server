import { ApiProperty } from "@nestjs/swagger";
import { ProductTypeModel } from "./product-type.model";
import { ProductModel } from "./product.model";
import { StoreModel } from "./store.model";

export class StoreProductModel {
    @ApiProperty()
    id: number;

    @ApiProperty()
    bar_code: string;

    @ApiProperty()
    product: ProductModel;

    @ApiProperty()
    store: StoreModel;

    @ApiProperty()
    product_type: ProductTypeModel;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    price: number;

    @ApiProperty()
    tax: number;

    @ApiProperty()
    alert_quantity: number;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;

    @ApiProperty()
    remarks: string;
}