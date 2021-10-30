import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Brand } from "src/brand/entities/brand.entity";
import { Category } from "src/category/entities/category.entity";
import { StoreProduct } from "src/store/entities/store-product.entity";
import { SupplierProduct } from "src/supplier/entities/supplier-product.entity";

export class ProductModel {
    @ApiProperty()
    @IsNotEmpty()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    product_code: string;
    
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
    store_product: StoreProduct[];

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