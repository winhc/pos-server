import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toOrderDto, toOrderModel } from 'src/helper/mapper/order.mapper';
import { formattedDate } from 'src/helper/utils';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDto } from './dto/order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
const logger = new Logger('OrderService')
@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>) { }

  async create(createOrderDto: CreateOrderDto): Promise<OrderDto> {
    const order: Order = this.orderRepository.create(createOrderDto);
    try {
      await this.orderRepository.save(order);
    } catch (error) {
      logger.error(`create: ${error}`);
      throw new InternalServerErrorException({ message: 'Create orders fail' });
    }
    const data = toOrderModel(order);
    return toOrderDto(data);
  }

  /**
   * find order data
   * return OrderDto
   */
  async findAll(order_code?: string, page_size?: number, page_index?: number, from_date?: string, to_date?: string): Promise<OrderDto> {
    logger.log(`page_size: ${page_size}, page_index: ${page_index}, order_code: ${order_code}, from_date: ${from_date}, to_date: ${to_date}`)
    try {

      // Option 1
      if (order_code && from_date && to_date && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [order, count] = await this.orderRepository.createQueryBuilder('order')
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('order.product', 'product')
          .leftJoinAndSelect('order.customer', 'customer')
          .where('DATE(order.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
          .andWhere('order.order_code LIKE :o_code', { o_code: `%${order_code}%` })
          .orderBy('order.id')
          .getManyAndCount()
        const data = order.map(value => toOrderModel(value));
        return toOrderDto(data, count);
      }
      // Option 2
      else if (from_date && to_date && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [order, count] = await this.orderRepository.createQueryBuilder('order')
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('order.product', 'product')
          .leftJoinAndSelect('order.customer', 'customer')
          .where('DATE(order.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
          .orderBy('order.id')
          .getManyAndCount()
        const data = order.map(value => toOrderModel(value));
        return toOrderDto(data, count);
      }
      // Option 3
      else if (order_code && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [order, count] = await this.orderRepository.createQueryBuilder('order')
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('order.product', 'product')
          .leftJoinAndSelect('order.customer', 'customer')
          .where('order.order_code LIKE :o_code', { o_code: `%${order_code}%` })
          .orderBy('order.id')
          .getManyAndCount()
        const data = order.map(value => toOrderModel(value));
        return toOrderDto(data, count)
      }
      // Option 4
      else if (page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [order, count] = await this.orderRepository.createQueryBuilder('order')
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('order.product', 'product')
          .leftJoinAndSelect('order.customer', 'customer')
          .orderBy('order.id')
          .getManyAndCount()
        const data = order.map(value => toOrderModel(value));
        return toOrderDto(data, count)
      }
      // Option 5
      else {
        const [order, count] = await this.orderRepository.createQueryBuilder('order')
          .leftJoinAndSelect('order.product', 'product')
          .leftJoinAndSelect('order.customer', 'customer')
          .orderBy('order.id')
          .getManyAndCount()
        const data = order.map(value => toOrderModel(value));
        return toOrderDto(data, count);
      }
    } catch (error) {
      logger.error(`findAll: ${error}`);
      throw new BadRequestException({ message: 'Order not found' });
    }
  }

  /**
   * find order data by id
   * return Order Entity
   */
  async findOne(id: number): Promise<Order> {
    try {
      return await this.orderRepository.findOneOrFail(id);
    } catch (error) {
      logger.warn(`findOne : ${error}`);
      throw new BadRequestException({ message: 'Order not found' });
    }
  }

  /**
   * find order data by id
   * return OrderDto
   */
  async findById(id: number): Promise<OrderDto> {
    try {
      const order = await this.findOne(id);
      const data = toOrderModel(order);
      return toOrderDto(data);
    } catch (error) {
      throw new BadRequestException({ message: 'Order not found' });
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<OrderDto> {
    const order = await this.findOne(id);
    if (!order) {
      throw new BadRequestException({ message: 'Order not found' });
    }
    try {
      updateOrderDto.updated_at = new Date();
      const orderToUpdate = Object.assign(order, updateOrderDto);
      await this.orderRepository.update(id, orderToUpdate);
    } catch (error) {
      logger.error(`update : ${error}`);
      throw new InternalServerErrorException({ message: 'Update order fail' })
    }
    const updateOrder = await this.findOne(order.id);
    const data = toOrderModel(updateOrder);
    return toOrderDto(data);
  }

  async remove(id: number): Promise<OrderDto> {
    const order = await this.findOne(id);
    if (!order) {
      throw new BadRequestException({ message: 'Order not found' });
    }
    const deleteOrder = await this.orderRepository.remove(order);
    const data = toOrderModel(deleteOrder);
    return toOrderDto(data);
  }
}
