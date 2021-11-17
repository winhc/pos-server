import { Customer } from "src/customer/entities/customer.entity";
import { Product } from "src/product/entities/product.entity";
import { Sale } from "src/sale/entities/sale.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: false })
    order_code: string;

    @ManyToOne(type => Product, product => product.orders)
    product: Product;

    @Column({ nullable: false })
    status: string;

    @ManyToOne(type => Customer, customer => customer.orders)
    customer: Customer;

    @ManyToOne(type => Sale, sale => sale.orders)
    sale: Sale;

    @Column({ nullable: false })
    quantity: number;

    @Column({ nullable: false })
    price: number;

    @Column({ nullable: true })
    remarks: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    updated_at: Date;
}
