import { ApiProperty } from "@nestjs/swagger";
import { UserType } from "src/user-type/entities/user-type.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
const bcrypt = require('bcrypt');

@Entity()
export class User {
    
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({nullable: false})
    user_name: string;

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
    @ManyToOne(type => UserType, user_type => user_type.users)
    user_type: UserType;

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
