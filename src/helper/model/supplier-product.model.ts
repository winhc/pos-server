import { ApiProperty } from "@nestjs/swagger";
import { ProductTypeModel } from "./product-type.model";
import { ProductModel } from "./product.model";
import { SupplierModel } from "./supplier.model";

export class SupplierProductModel {
    @ApiProperty()
    id: number;

    @ApiProperty()
    bar_code: string;

    @ApiProperty()
    product: ProductModel;

    @ApiProperty()
    supplier: SupplierModel;

    @ApiProperty()
    product_type: ProductTypeModel;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    cost: number;

    @ApiProperty()
    alert_quantity: number;

    @ApiProperty()
    expiry_at: Date;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;

    @ApiProperty()
    remarks: string;
}