import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Customer } from 'src/customer/entities/customer.entity';
import { CustomerModel } from 'src/helper/model/customer.model';
import { ProductModel } from 'src/helper/model/product.model';
import { Product } from 'src/product/entities/product.entity';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    order_code: string;

    @ApiProperty({ type: ProductModel, required: true })
    @IsNotEmpty()
    product: Product;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    status: string;

    @ApiProperty({ type: CustomerModel, required: true })
    @IsNotEmpty()
    customer: Customer;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    price: number;

    @ApiProperty({ required: false })
    remarks?: string;

    @ApiProperty({ required: false })
    updated_at?: Date;
}
