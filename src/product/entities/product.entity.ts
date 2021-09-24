import { ApiProperty } from "@nestjs/swagger";
import { Brand } from "src/brand/entities/brand.entity";
import { Category } from "src/category/entities/category.entity";
import { ProductType } from "src/product-type/entities/product-type.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({nullable: false, unique: true})
    product_code: string;

    @ApiProperty()
    @Column({nullable: false, unique: true})
    product_name: string;

    @ApiProperty()
    @Column({nullable: false})
    image: string;

    @ApiProperty()
    @OneToOne(() => Category)
    @JoinColumn()
    category: Category;

    @ApiProperty()
    @OneToOne(() => ProductType)
    @JoinColumn()
    product_type: ProductType;

    @ApiProperty()
    @OneToOne(() => Brand)
    @JoinColumn()
    brand: Brand;

    @ApiProperty()
    @Column({nullable: false})
    buy_unit_price: number;

    @ApiProperty()
    @Column({nullable: false})
    sell_unit_price: number;

    @ApiProperty()
    @Column({ type: 'timestamp', nullable: true })
    expiry_at: Date;

    @ApiProperty()
    @Column({nullable: false})
    tax: number;

    @ApiProperty()
    @Column({nullable: false})
    quantity: number;

    @ApiProperty()
    @Column({nullable: false})
    alert_quantity: number;

    @ApiProperty()
    @Column({nullable: true})
    for_sale: boolean;

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
