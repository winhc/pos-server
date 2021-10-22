import { ApiProperty } from "@nestjs/swagger";
import { Brand } from "src/brand/entities/brand.entity";
import { Category } from "src/category/entities/category.entity";
import { ProductType } from "src/product-type/entities/product-type.entity";
import { Supplier } from "src/supplier/entities/supplier.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
    @ManyToOne(type => Category, category => category.products)
    category: Category;

    @ApiProperty()
    @ManyToOne(type => ProductType, product_type => product_type.products)
    product_type: ProductType;

    @ApiProperty()
    @ManyToOne(type => Brand, brand => brand.products)
    brand: Brand;

    @ApiProperty()
    @ManyToOne(type => Supplier, supplier => supplier.products)
    supplier: Supplier;

    @ApiProperty()
    @Column({ nullable: false })
    buy_unit_price: number;

    @ApiProperty()
    @Column({ nullable: false })
    sell_unit_price: number;

    @ApiProperty()
    @Column({ type: 'timestamp', nullable: true })
    expiry_at: Date;

    @ApiProperty()
    @Column({ nullable: true })
    tax: number;

    @ApiProperty()
    @Column({ nullable: false })
    quantity: number;

    @ApiProperty()
    @Column({ nullable: false })
    alert_quantity: number;

    @ApiProperty()
    @Column({ nullable: true })
    for_sale: boolean;

    @ApiProperty()
    @Column({ nullable: true })
    remarks: string;

    @ApiProperty()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    created_at: Date;

    @ApiProperty()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    updated_at: Date;
}
