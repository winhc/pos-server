import { Order } from "src/order/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
const bcrypt = require('bcrypt');

@Entity()
export class Customer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    customer_name: string;

    @Column({ nullable: true, unique: false })
    phone: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    remarks: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    updated_at: Date;

    @OneToMany(type => Order, order => order.customer)
    orders: Order[]
}
