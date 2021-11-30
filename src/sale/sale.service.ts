import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toSaleDto, toSaleModel } from 'src/helper/mapper/sale.mapper';
import { formattedDate } from 'src/helper/utils';
import { Order } from 'src/order/entities/order.entity';
import { In, Repository } from 'typeorm';
import { CreateSaleDto } from './dto/create-sale.dto';
import { SaleDto } from './dto/sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';
const logger = new Logger('SaleService');

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale) private readonly saleRepository: Repository<Sale>,
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
  ) { }

  async create(createSaleDto: CreateSaleDto): Promise<SaleDto> {
    const sale: Sale = this.saleRepository.create(createSaleDto);
    try {
      const createdSale = await this.saleRepository.save(sale);
      if(createdSale.id > 0){
        this.orderRepository
        .createQueryBuilder()
        .update(Order)
        .set({ sale: sale })
        .where({ id: In(createSaleDto.orderIds) })
        .execute();
      }
    } catch (error) {
      logger.error(`create: ${error}`);
      throw new InternalServerErrorException({ message: 'Create sale fail' });
    }
    const data = toSaleModel(sale);
    return toSaleDto(data);
  }

  /**
   * find sale data
   * return SaleDto
   */
  async findAll(sale_code?: string, page_size?: number, page_index?: number, from_date?: string, to_date?: string): Promise<SaleDto> {
    logger.log(`page_size: ${page_size}, page_index: ${page_index}, sale_code: ${sale_code}, from_date: ${from_date}, to_date: ${to_date}`)
    try {

      // Option 1
      if (sale_code && from_date && to_date && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [sale, count] = await this.saleRepository.createQueryBuilder('sale')
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('sale.user', 'user')
          .where('DATE(sale.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
          .andWhere('sale.sale_code LIKE :o_code', { o_code: `%${sale_code}%` })
          .orderBy('sale.id')
          .getManyAndCount()
        const data = sale.map(value => toSaleModel(value));
        return toSaleDto(data, count);
      }
      // Option 2
      else if (from_date && to_date && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [sale, count] = await this.saleRepository.createQueryBuilder('sale')
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('sale.user', 'user')
          .where('DATE(sale.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
          .orderBy('sale.id')
          .getManyAndCount()
        const data = sale.map(value => toSaleModel(value));
        return toSaleDto(data, count);
      }
      // Option 3
      else if (sale_code && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [sale, count] = await this.saleRepository.createQueryBuilder('sale')
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('sale.user', 'user')
          .where('sale.sale_code LIKE :o_code', { o_code: `%${sale_code}%` })
          .orderBy('sale.id')
          .getManyAndCount()
        const data = sale.map(value => toSaleModel(value));
        return toSaleDto(data, count)
      }
      // Option 4
      else if (page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [sale, count] = await this.saleRepository.createQueryBuilder('sale')
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('sale.user', 'user')
          .orderBy('sale.id')
          .getManyAndCount()
        const data = sale.map(value => toSaleModel(value));
        return toSaleDto(data, count)
      }
      // Option 5
      else {
        const [sale, count] = await this.saleRepository.createQueryBuilder('sale')
          .leftJoinAndSelect('sale.user', 'user')
          .orderBy('sale.id')
          .getManyAndCount()
        const data = sale.map(value => toSaleModel(value));
        return toSaleDto(data, count);
      }
    } catch (error) {
      logger.error(`findAll: ${error}`);
      throw new BadRequestException({ message: 'Sale not found' });
    }
  }

  /**
   * find sale data by id
   * return Sale Entity
   */
  async findOne(id: number): Promise<Sale> {
    try {
      return await this.saleRepository.findOneOrFail(id);
    } catch (error) {
      logger.warn(`findOne : ${error}`);
      throw new BadRequestException({ message: 'Sale not found' });
    }
  }

  /**
   * find sale data by id
   * return SaleDto
   */
  async findById(id: number): Promise<SaleDto> {
    try {
      const sale = await this.findOne(id);
      const data = toSaleModel(sale);
      return toSaleDto(data);
    } catch (error) {
      throw new BadRequestException({ message: 'Sale not found' });
    }
  }

  async update(id: number, updateSaleDto: UpdateSaleDto): Promise<SaleDto> {
    const sale = await this.findOne(id);
    if (!sale) {
      throw new BadRequestException({ message: 'Sale not found' });
    }
    try {
      updateSaleDto.updated_at = new Date();
      const saleToUpdate = Object.assign(sale, updateSaleDto);
      await this.saleRepository.update(id, saleToUpdate);
    } catch (error) {
      logger.error(`update : ${error}`);
      throw new InternalServerErrorException({ message: 'Update sale fail' })
    }
    const updateOrder = await this.findOne(sale.id);
    const data = toSaleModel(updateOrder);
    return toSaleDto(data);
  }

  async remove(id: number): Promise<SaleDto> {
    const sale = await this.findOne(id);
    if (!sale) {
      throw new BadRequestException({ message: 'Sale not found' });
    }
    const deleteSale = await this.saleRepository.remove(sale);
    const data = toSaleModel(deleteSale);
    return toSaleDto(data);
  }
}
