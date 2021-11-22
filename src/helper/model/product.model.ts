import { ApiProperty } from "@nestjs/swagger";
import { Brand } from "src/brand/entities/brand.entity";
import { Category } from "src/category/entities/category.entity";
import { Order } from "src/order/entities/order.entity";
import { ProductType } from "src/product-type/entities/product-type.entity";
import { Purchase } from "src/purchase/entities/purchase.entity";

export class ProductModel {
    @ApiProperty()
    id: number;

    @ApiProperty()
    product_code: string;

    @ApiProperty()
    bar_code: string;

    @ApiProperty()
    product_name: string;

    @ApiProperty()
    image: string;

    @ApiProperty()
    category: Category;

    @ApiProperty()
    brand: Brand;

    @ApiProperty()
    product_type: ProductType;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    cost: number;

    @ApiProperty()
    price: number;

    @ApiProperty()
    alert_quantity: number;

    @ApiProperty()
    expiry_at: Date;

    @ApiProperty()
    orders: Order[];

    @ApiProperty()
    purchases: Purchase[];

    @ApiProperty()
    remarks: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;
}