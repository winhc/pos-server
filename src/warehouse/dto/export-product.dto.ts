import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ProductType } from 'src/product-type/entities/product-type.entity';
import { Store } from 'src/store/entities/store.entity';

export class ExportProductDto {

    @ApiProperty({ required: true })
    @IsNotEmpty()
    store: Store;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    product_type: ProductType;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    price: number;

    @ApiProperty({ required: false })
    tax?: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    alert_quantity: number;

    @ApiProperty({ required: false })
    remarks?: string;

    @ApiProperty({ required: false })
    updated_at?: Date;
}
