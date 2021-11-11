import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/product/entities/product.entity";
import { Supplier } from "src/supplier/entities/supplier.entity";

export class PurchaseModel {
    @ApiProperty()
    id: number;

    @ApiProperty()
    supplier: Supplier;

    @ApiProperty({ type: Product })
    product: Product;

    @ApiProperty()
    quantity: number;

    @ApiProperty({ nullable: false })
    cost: number;

    @ApiProperty()
    remarks: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at?: Date;
}