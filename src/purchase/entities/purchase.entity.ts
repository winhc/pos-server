import { Product } from "src/product/entities/product.entity";
import { Supplier } from "src/supplier/entities/supplier.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Purchase {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Supplier, supplier => supplier.purchases)
    supplier: Supplier;

    @ManyToOne(type => Product, product => product.purchases)
    product: Product;

    @Column({ nullable: false })
    quantity: number;

    @Column({ nullable: false })
    cost: number;

    @Column({ nullable: true })
    remarks: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    updated_at: Date;
}
