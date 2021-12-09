import { Brand } from "src/brand/entities/brand.entity";
import { Category } from "src/category/entities/category.entity";
import { Order } from "src/order/entities/order.entity";
import { ProductType } from "src/product-type/entities/product-type.entity";
import { Purchase } from "src/purchase/entities/purchase.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    product_code: string;

    @Column({ nullable: false, unique: true })
    bar_code: string;

    @Column({ nullable: false, unique: true })
    product_name: string;

    @Column({ nullable: true })
    image: string;

    @ManyToOne(type => Category, category => category.products)
    category: Category;

    @ManyToOne(type => Brand, brand => brand.products, {nullable: true})
    brand: Brand;

    @ManyToOne(type => ProductType, product_type => product_type.products)
    product_type: ProductType;

    @Column({ nullable: true })
    quantity: number;

    @Column({ nullable: true })
    cost: number;

    @Column({ nullable: true })
    price: number;

    @Column({ nullable: true })
    alert_quantity: number;

    @Column({ type: 'timestamp', nullable: true })
    expiry_at: Date;

    @Column({ nullable: true })
    remarks: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    updated_at: Date;

    @OneToMany(type => Order, order => order.product)
    orders: Order[];

    @OneToMany(type => Purchase, purchase => purchase.product)
    purchases: Purchase[];
}
