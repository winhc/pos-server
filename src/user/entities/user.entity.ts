import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import UserType from "../enum/user.type";
const bcrypt = require('bcrypt');

@Entity()
export class User {
    
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({nullable: false})
    name: string;

    @ApiProperty()
    @Column({nullable: false, unique: true})
    account: string;

    @ApiProperty()
    @Column({nullable: false})
    password: string;
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }

    @ApiProperty()
    @Column({nullable: false})
    type: UserType;

    @ApiProperty()
    @Column({nullable: true})
    remarks: string;
    
    @ApiProperty()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    created_at: Date;

    @ApiProperty()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    updated_at: Date;

}
