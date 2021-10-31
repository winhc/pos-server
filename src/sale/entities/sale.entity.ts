import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sale {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    order_code: string;

    @ManyToOne(type => User, user=> user.sales)
    user: User;

    @Column({ nullable: false })
    total_amount: number;

    @Column({ nullable: false })
    pay: number;

    @Column({ nullable: true })
    refund: number;

    @Column({ nullable: true })
    remarks: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    updated_at: Date;
}
