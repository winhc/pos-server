import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    user_role: string;

    @Column({ nullable: true })
    remarks: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    updated_at: Date;

    @OneToMany(type => User, users => users.user_type)
    users: User[]
}
