import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({nullable: false, unique: true})
    category_code: string;

    @ApiProperty()
    @Column({nullable: false, unique: true})
    category_name: string;

    @ApiProperty()
    @Column({nullable: true})
    image: string;

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
