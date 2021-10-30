import { ApiProperty } from "@nestjs/swagger";
import { ProductType } from "src/product-type/entities/product-type.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Store } from "./store.entity";

@Entity()
export class StoreProduct {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ nullable: false, unique: true, length: 13})
    bar_code: string;

    @ApiProperty()
    @ManyToOne(type => Product, product => product.store_product)
    product: Product;

    @ApiProperty()
    @ManyToOne( type => Store, store => store.store_products)
    store: Store;

    @ApiProperty()
    @ManyToOne(type => ProductType, product_type => product_type.stores)
    product_type: ProductType;

    @ApiProperty()
    @Column({ nullable: false })
    quantity: number;

    @ApiProperty()
    @Column({ nullable: false })
    price: number;

    @ApiProperty()
    @Column({ nullable: true })
    tax: number;

    @ApiProperty()
    @Column({ nullable: true })
    alert_quantity: number;

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
