import { ApiProperty } from "@nestjs/swagger";
import { Brand } from "src/brand/entities/brand.entity";
import { Category } from "src/category/entities/category.entity";
import { Order } from "src/order/entities/order.entity";
import { ProductType } from "src/product-type/entities/product-type.entity";
import { StoreProduct } from "src/store/entities/store-product.entity";
import { Store } from "src/store/entities/store.entity";
import { SupplierProduct } from "src/supplier/entities/supplier-product.entity";
import { Supplier } from "src/supplier/entities/supplier.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ nullable: false, unique: true })
    product_code: string;

    @ApiProperty()
    @Column({ nullable: false, unique: true })
    product_name: string;

    @ApiProperty()
    @Column({ nullable: true })
    image: string;
    
    @ApiProperty()
    @Column({ nullable: true })
    remarks: string;

    @ApiProperty()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    created_at: Date;

    @ApiProperty()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    updated_at: Date;

    @ApiProperty()
    @ManyToOne(type => Category, category => category.products)
    category: Category;

    @ApiProperty()
    @ManyToOne(type => Brand, brand => brand.products)
    brand: Brand;

    @ApiProperty()
    @OneToMany(type => SupplierProduct, supplierProduct => supplierProduct.product)
    supplier_product: SupplierProduct[];

    @ApiProperty()
    @OneToMany(type => StoreProduct, storeProduct => storeProduct.product)
    store_product: StoreProduct[];
}
