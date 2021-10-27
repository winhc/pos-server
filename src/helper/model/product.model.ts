import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Brand } from "src/brand/entities/brand.entity";
import { Category } from "src/category/entities/category.entity";
import { ProductType } from "src/product-type/entities/product-type.entity";
import { SupplierProduct } from "src/supplier/entities/supplier-product.entity";
import { Supplier } from "src/supplier/entities/supplier.entity";
import { BrandModel } from "./brand.model";
import { CategoryModel } from "./category.model";
import { ProductTypeModel } from "./product-type.model";
import { SupplierModel } from "./supplier.model";

export class ProductModel {
    @ApiProperty()
    @IsNotEmpty()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    product_code: string;

    @ApiProperty()
    @IsNotEmpty()
    bar_code: string;

    @ApiProperty()
    @IsNotEmpty()
    product_name: string;

    @ApiProperty()
    image: string;

    @ApiProperty()
    @IsNotEmpty()
    category: Category;

    @ApiProperty()
    @IsNotEmpty()
    brand: Brand;

    @ApiProperty()
    @IsNotEmpty()
    supplier_product: SupplierProduct[];

    @ApiProperty()
    @IsNotEmpty()
    cost: number;

    @ApiProperty()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty()
    @IsNotEmpty()
    alert_quantity: number;

    @ApiProperty()
    @IsNotEmpty()
    remarks: string;

    @ApiProperty()
    @IsNotEmpty()
    created_at: Date;

    @ApiProperty()
    @IsNotEmpty()
    updated_at: Date;
}