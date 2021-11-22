import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toProductDto, toProductModel } from 'src/helper/mapper/product.maper';
import { toSaleDto, toSaleModel } from 'src/helper/mapper/sale.mapper';
import { formattedDate } from 'src/helper/utils';
import { Product } from 'src/product/entities/product.entity';
import { SaleDto } from 'src/sale/dto/sale.dto';
import { Sale } from 'src/sale/entities/sale.entity';
import { Repository } from 'typeorm';
import { DashboardDto } from './dto/dashboard.dto';

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(Sale) private readonly saleRepository: Repository<Sale>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        ){}

    async findDashboardReport(from_date: string, to_date: string): Promise<DashboardDto> {
        try {
            const [saleArr, saleCount] = await this.saleRepository.createQueryBuilder('sale')
              .where('DATE(sale.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
              .orderBy('sale.id')
              .getManyAndCount()
            const saleData = saleArr.map(value => toSaleModel(value));
            const sale = toSaleDto(saleData, saleCount);

            const [productArr, productCount] = await this.productRepository.createQueryBuilder('product')
              .innerJoinAndSelect('product.orders', 'orders')
              .where('DATE(product.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
              .orderBy('product.id')
              .getManyAndCount()
            const productData = productArr.map(value => toProductModel(value));
            const product =  toProductDto(productData, productCount);

            const [purchaseArr, purchaseCount] = await this.productRepository.createQueryBuilder('product')
              .innerJoinAndSelect('product.purchases', 'purchases')
              .where('DATE(product.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
              .orderBy('product.id')
              .getManyAndCount()
            const purchaseData = purchaseArr.map(value => toProductModel(value));
            const purchase =  toProductDto(purchaseData, productCount);

            const dashboardDto:DashboardDto = {
                sale,
                product,
                purchase,
                user: null,
            };
            return dashboardDto;
        } catch (error) {
          throw new BadRequestException({ message: 'Sale not found' });
        }
      }
}
