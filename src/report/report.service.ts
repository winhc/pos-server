import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toOrderDto, toOrderModel } from 'src/helper/mapper/order.mapper';
import { toProductDto, toProductModel } from 'src/helper/mapper/product.maper';
import { toSaleDto, toSaleModel } from 'src/helper/mapper/sale.mapper';
import { formattedDate } from 'src/helper/utils';
import { OrderDto } from 'src/order/dto/order.dto';
import { Order } from 'src/order/entities/order.entity';
import { ProductDto } from 'src/product/dto/product.dto';
import { Product } from 'src/product/entities/product.entity';
import { SaleDto } from 'src/sale/dto/sale.dto';
import { Sale } from 'src/sale/entities/sale.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportService {
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(Sale) private readonly saleRepository: Repository<Sale>,
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    ) { }

    async findSaleReport(page_size?: number, page_index?: number, from_date?: string, to_date?: string): Promise<OrderDto> {
        try {
            const fromIndex = (page_index - 1) * page_size;
            const takeLimit = page_size;

            if (from_date && to_date) {
                const [product, count] = await this.orderRepository.createQueryBuilder('order')
                    .skip(fromIndex)
                    .take(takeLimit)
                    .innerJoinAndSelect('order.sale', 'sale')
                    .innerJoinAndSelect('order.product', 'product')
                    .where('DATE(sale.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
                    .getManyAndCount();
                const data = product.map(value => toOrderModel(value));
                return toOrderDto(data, count);
            } else {
                const [product, count] = await this.orderRepository.createQueryBuilder('order')
                    .skip(fromIndex)
                    .take(takeLimit)
                    .innerJoinAndSelect('order.sale', 'sale')
                    .innerJoinAndSelect('order.product', 'product')
                    .getManyAndCount();
                const data = product.map(value => toOrderModel(value));
                return toOrderDto(data, count);
            }
        } catch (error) {

        }
    }
}
