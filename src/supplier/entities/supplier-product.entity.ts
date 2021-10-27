import { ApiProperty } from "@nestjs/swagger";
import { ProductType } from "src/product-type/entities/product-type.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Supplier } from "./supplier.entity";

@Entity()
export class SupplierProduct {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @ManyToOne(type => Product, product => product.supplier_product)
    product: Product;

    @ApiProperty()
    @ManyToOne(type => Supplier, supplier => supplier.supplier_products)
    supplier: Supplier;

    @ApiProperty()
    @ManyToOne(type => ProductType, product_type => product_type.suppliers)
    product_type: ProductType;

    @ApiProperty()
    @Column({ nullable: true })
    quantity: number;

    @ApiProperty()
    @Column({ nullable: true })
    cost: number;

    @ApiProperty()
    @Column({ nullable: true })
    alert_quantity: number;

    @ApiProperty()
    @Column({ type: 'timestamp', nullable: true })
    expiry_at: Date;

    @ApiProperty()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    created_at: Date;

    @ApiProperty()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    updated_at: Date;

    @ApiProperty()
    @Column({ nullable: true })
    remarks: string;
}
