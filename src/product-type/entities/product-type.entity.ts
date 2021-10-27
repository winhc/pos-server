import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/product/entities/product.entity";
import { StoreProduct } from "src/store/entities/store-product.entity";
import { SupplierProduct } from "src/supplier/entities/supplier-product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductType {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ nullable: false, unique: true })
    unit: string;

    @ApiProperty()
    @Column({ nullable: true })
    remarks: string;

    @ApiProperty()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    created_at: Date;

    @ApiProperty()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    updated_at: Date;

    @OneToMany(type => SupplierProduct, supplierProduct => supplierProduct.product_type)
    suppliers: SupplierProduct[];

    @OneToMany(type => StoreProduct, storeProduct => storeProduct.product_type)
    stores: StoreProduct[];
}
