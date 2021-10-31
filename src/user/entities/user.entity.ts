import { Sale } from "src/sale/entities/sale.entity";
import { UserType } from "src/user-type/entities/user-type.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
const bcrypt = require('bcrypt');

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    user_name: string;

    @Column({ nullable: false, unique: true })
    account: string;

    @Column({ nullable: false })
    password: string;
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }

    @ManyToOne(type => UserType, user_type => user_type.users)
    user_type: UserType;

    @OneToMany(type => Sale, sale => sale.user)
    sales: Sale[];

    @Column({ nullable: true })
    remarks: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    updated_at: Date;

}
