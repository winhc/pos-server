import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toProductDto, toProductModel } from 'src/helper/mapper/product.maper';
import { toSaleDto, toSaleModel } from 'src/helper/mapper/sale.mapper';
import { toUserTypeDto, toUserTypeModel } from 'src/helper/mapper/user-type.mapper';
import { formattedDate } from 'src/helper/utils';
import { Product } from 'src/product/entities/product.entity';
import { Sale } from 'src/sale/entities/sale.entity';
import { UserType } from 'src/user-type/entities/user-type.entity';
import { Repository } from 'typeorm';
import { DashboardDto } from './dto/dashboard.dto';
const logger = new Logger('Dashboard Service')
@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(Sale) private readonly saleRepository: Repository<Sale>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(UserType) private readonly userTypeRepository: Repository<UserType>,
    ) { }

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
            const product = toProductDto(productData, productCount);

            logger.log(`formatted to_date ${formattedDate(to_date)}`)
            const [purchaseArr, purchaseCount] = await this.productRepository.createQueryBuilder('product')
                .innerJoinAndSelect('product.purchases', 'purchases')
                .where('DATE(product.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
                .orderBy('product.id')
                .getManyAndCount()
            const purchaseData = purchaseArr.map(value => toProductModel(value));
            const purchase = toProductDto(purchaseData, purchaseCount);

            const [userArr, userCount] = await this.userTypeRepository.createQueryBuilder('user_type')
                .innerJoinAndSelect('user_type.users', 'user')
                // .where('DATE(user.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
                .orderBy('user_type.id')
                .getManyAndCount()
            const userData = userArr.map(value => toUserTypeModel(value));
            const user = toUserTypeDto(userData, userCount);

            const dashboardDto: DashboardDto = {
                sale,
                product,
                purchase,
                user,
            };
            return dashboardDto;
        } catch (error) {
            logger.debug(error)
            throw new InternalServerErrorException({ message: 'Internal server error' });
        }
    }
}
