import { ApiProperty } from "@nestjs/swagger";
import { Order } from "src/order/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
const bcrypt = require('bcrypt');

@Entity()
export class Customer {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ nullable: false })
    customer_name: string;

    @ApiProperty()
    @Column({ nullable: true, unique: false })
    phone: string;

    @ApiProperty()
    @Column({ nullable: true })
    address: string;

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
    @OneToMany(type => Order, order => order.customer)
    orders: Order[]
}