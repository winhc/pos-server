import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SupplierProduct } from "./supplier-product.entity";

@Entity()
export class Supplier {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ nullable: false })
    supplier_name: string;

    @ApiProperty()
    @Column({ nullable: false, unique: true })
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

    @OneToMany(type => SupplierProduct, supplierProduct => supplierProduct.supplier)
    supplier_products: SupplierProduct[];
}