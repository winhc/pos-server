import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toCustomerDto, toCustomerModel } from 'src/helper/mapper/customer.mapper';
import { formattedDate } from 'src/helper/utils';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerDto } from './dto/customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
const logger = new Logger('CustomerService');

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>) { }

  /**
   * create new customer data
   * return CustomerDto
   */
  async create(createCustomerDto: CreateCustomerDto): Promise<CustomerDto> {
    const { phone } = createCustomerDto;
    const inDb = await this.customerRepository.findOne({ where: { phone } });
    if (inDb) {
      throw new BadRequestException({ message: 'This phone number is already exit' });
    }
    const customer: Customer = this.customerRepository.create(createCustomerDto);
    try {
      await this.customerRepository.save(customer);
    } catch (error) {
      logger.error(`create: ${error}`);
      throw new InternalServerErrorException({ message: 'Create customer fail' });
    }
    const data = toCustomerModel(customer);
    return toCustomerDto(data);
  }

  /**
   * find customer data
   * return CustomerDto
   */
  async findAll(page_size?: number, page_index?: number, customer_name?: string, from_date?: string, to_date?: string): Promise<CustomerDto> {
    logger.log(`page_size: ${page_size}, page_index: ${page_index}, customer_name: ${customer_name}, from_date: ${from_date}, to_date: ${to_date}`)
    try {
      if (customer_name && from_date && to_date && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;
        const customer = await this.customerRepository.createQueryBuilder('customer')
          .select('*')
          .addSelect('COUNT(*) OVER () AS count')
          .where('DATE(customer.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
          .andWhere('customer.customer_name LIKE :c_name', { c_name: `%${customer_name}%` })
          .skip(fromIndex)
          .take(takeLimit)
          .orderBy('customer.id')
          .getRawMany();
        // logger.log(`customer => ${customer}`);
        const data = customer.map(value => toCustomerModel(value));
        // logger.log(`data => ${data}, count => ${customer[0]?.count}`);
        const count = parseInt(customer[0]?.count);
        return toCustomerDto(data, count);
      }
      else if (from_date && to_date && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;
        const customer = await this.customerRepository.createQueryBuilder('customer')
          .select('*')
          .addSelect('COUNT(*) OVER () AS count')
          .where('DATE(customer.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
          .skip(fromIndex)
          .take(takeLimit)
          .orderBy('customer.id')
          .getRawMany();

        // logger.log(`customer => ${customer}`);
        const data = customer.map(value => toCustomerModel(value));
        // logger.log(`data => ${data}, count => ${customer[0]?.count}`);
        const count = parseInt(customer[0]?.count);
        return toCustomerDto(data, count);

      }
      else if (customer_name && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;
        const customer = await this.customerRepository.createQueryBuilder('customer')
          .select('*')
          .addSelect('COUNT(*) OVER () AS count')
          .where('customer.customer_name LIKE :c_name', { c_name: `%${customer_name}%` })
          .skip(fromIndex)
          .take(takeLimit)
          .orderBy('customer.id')
          .getRawMany();
        // logger.log(`customer => ${customer}`);
        const data = customer.map(value => toCustomerModel(value));
        // logger.log(`data => ${data}, count => ${customer[0]?.count}`);
        const count = parseInt(customer[0]?.count);
        return toCustomerDto(data, count);
      }
      else if (page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;
        const [customer, count] = await this.customerRepository.findAndCount({ skip: fromIndex, take: takeLimit });
        // logger.log(`data => ${customer}`)
        // logger.log(`total_count => ${count}`)
        const data = customer.map(value => toCustomerModel(value));
        return toCustomerDto(data, count);
      } else {
        const [customer, count] = await this.customerRepository.findAndCount();
        const data = customer.map(value => toCustomerModel(value));
        return toCustomerDto(data, count);
      }
    } catch (error) {
      logger.error(`findAll: ${error}`);
      throw new BadRequestException({ message: 'Customer not found' });
    }
  }

  /**
   * find customer data by id
   * return Customer Entity
   */
  async findOne(id: number): Promise<Customer> {
    try {
      return await this.customerRepository.findOneOrFail(id);
    } catch (error) {
      logger.warn(`findOne : ${error}`);
      throw new BadRequestException({ message: 'Customer not found' });
    }
  }

  /**
   * find customer data by id
   * return CustomerDto
   */
  async findById(id: number): Promise<CustomerDto> {
    try {
      const customer = await this.findOne(id);
      const data = toCustomerModel(customer);
      return toCustomerDto(data);
    } catch (error) {
      throw new BadRequestException({ message: 'Customer not found' });
    }
  }
  /**
   * Update customer row data that matches given id
   * return CustomerDto
   */
  async update(id: number, updateCustomerDto: UpdateCustomerDto, image_name?: string): Promise<CustomerDto> {
    const customer = await this.findOne(id);
    if (!customer) {
      throw new BadRequestException({ message: 'Customer not found' });
    }
    try {
      updateCustomerDto.updated_at = new Date();
      // logger.log(`image => ${updateCustomerDto.image} type ${typeof image_name}`)
      const customerToUpdate = Object.assign(customer, updateCustomerDto);
      await this.customerRepository.update(id, customerToUpdate);
    } catch (error) {
      logger.error(`update : ${error}`);
      throw new InternalServerErrorException({ message: 'Update fail' })
    }
    const updateCustomer = await this.findOne(customer.id);
    const data = toCustomerModel(updateCustomer);
    return toCustomerDto(data);
  }

  /**
   * Delete entre customer row data that matches given id.
   */
  async remove(id: number): Promise<CustomerDto> {
    const customer = await this.findOne(id);
    if (!customer) {
      throw new BadRequestException({ message: 'Customer not found' });
    }
    const deleteCustomer = await this.customerRepository.remove(customer);
    const data = toCustomerModel(deleteCustomer);
    return toCustomerDto(data);
  }
}
