import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toSupplierDto, toSupplierModel } from 'src/helper/mapper/supplier.mapper';
import { formattedDate } from 'src/helper/utils';
import { Like, Repository } from 'typeorm';
import { CreateSupplierProductDto } from './dto/create-supplier-product.dto';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { SupplierDto } from './dto/supplier.dto';
import { UpdateSupplierProductDto } from './dto/update-supplier-product.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierProduct } from './entities/supplier-product.entity';
import { Supplier } from './entities/supplier.entity';
const logger = new Logger('SupplierService')

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier) private readonly supplierRepository: Repository<Supplier>,
    @InjectRepository(SupplierProduct) private readonly supplierProductRepository: Repository<SupplierProduct>) { }

  /**
   * create new supplier data
   * return SupplierDto
   */
  async create(createSupplierDto: CreateSupplierDto): Promise<SupplierDto> {
    createSupplierDto.phone = createSupplierDto.phone != '' ? '09' + createSupplierDto.phone : '';
    const { phone } = createSupplierDto;
    const inDb = await this.supplierRepository.findOne({ where: { phone } });
    if (inDb) {
      throw new BadRequestException({ message: 'This phone number is already exit' });
    }
    const supplier: Supplier = this.supplierRepository.create(createSupplierDto);
    try {
      await this.supplierRepository.save(supplier);
    } catch (error) {
      logger.error(`create: ${error}`);
      throw new InternalServerErrorException({ message: 'Create supplier fail' });
    }
    const data = toSupplierModel(supplier);
    return toSupplierDto(data);
  }

  /**
   * create new supplier product data
   * return SupplierProduct entity
   */
  async createSupplierProduct(createSupplierProductDto: CreateSupplierProductDto): Promise<SupplierProduct> {
    const supplierProduct: SupplierProduct = this.supplierProductRepository.create(createSupplierProductDto);
    try {
      await this.supplierProductRepository.save(supplierProduct);
    } catch (error) {
      logger.error(`create: ${error}`);
      throw new InternalServerErrorException({ message: 'Create supplier product fail' });
    }
    return supplierProduct;
  }

  /**
   * update supplier product data
   * return SupplierProduct entity
   */
  async updateSupplierProduct(id: number, updateSupplierProductDto: UpdateSupplierProductDto): Promise<SupplierProduct> {
    const supplierProduct = await this.supplierProductRepository.findOne(id);
    if (!supplierProduct) {
      throw new BadRequestException({ message: `Supplier's product not found` });
    }
    try {
      const supplierProductToUpdate = Object.assign(supplierProduct, updateSupplierProductDto);
      await this.supplierProductRepository.update(id, supplierProductToUpdate);
    } catch (error) {
      logger.error(`update : ${error}`);
      throw new InternalServerErrorException({ message: 'Update fail' })
    }
    const updateSupplierProduct = await this.supplierProductRepository.findOne(supplierProduct.id)
    return updateSupplierProduct;
  }

  /**
   * find supplier data
   * return SupplierDto
   */
  async findAll(page_size?: number, page_index?: number, supplier_name?: string, from_date?: string, to_date?: string): Promise<SupplierDto> {
    logger.log(`page_size: ${page_size}, page_index: ${page_index}, supplier_name: ${supplier_name}, from_date: ${from_date}, to_date: ${to_date}`)
    try {
      // Option 1
      if (supplier_name && from_date && to_date && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [supplier, count] = await this.supplierRepository.createQueryBuilder('supplier')
          .where('DATE(supplier.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
          .andWhere('supplier.supplier_name LIKE :s_name', { s_name: `%${supplier_name}%` })
          .skip(fromIndex)
          .take(takeLimit)
          // .leftJoinAndSelect('supplier.products', 'products')
          .orderBy('supplier.id')
          .getManyAndCount()

        logger.log(`supplier => ${supplier}, count => ${count}`);
        const data = supplier.map(value => toSupplierModel(value));
        return toSupplierDto(data, count);
      }
      // Option 2
      else if (from_date && to_date && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [supplier, count] = await this.supplierRepository.createQueryBuilder('supplier')
          .where('DATE(supplier.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
          .skip(fromIndex)
          .take(takeLimit)
          // .leftJoinAndSelect('supplier.products', 'products')
          .orderBy('supplier.id')
          .getManyAndCount()

        logger.log(`supplier => ${supplier}, count => ${count}`);
        const data = supplier.map(value => toSupplierModel(value));
        return toSupplierDto(data, count);
      }
      // Option 3
      else if (supplier_name && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [supplier, count] = await this.supplierRepository.findAndCount({
          // relations: ['products'],
          skip: fromIndex,
          take: takeLimit,
          where: { supplier_name: Like(`%${supplier_name}%`) }
        });
        logger.log(`supplier => ${supplier}, count: ${count}`);
        const data = supplier.map(value => toSupplierModel(value));
        return toSupplierDto(data, count)
      }
      // Option 4
      else if (page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [supplier, count] = await this.supplierRepository.findAndCount({
          // relations: ['products'],
          skip: fromIndex,
          take: takeLimit
        });
        logger.log(`supplier => ${supplier}, count: ${count}`);
        const data = supplier.map(value => toSupplierModel(value));
        return toSupplierDto(data, count)
      }
      // Option 5
      else {
        const [supplier, count] = await this.supplierRepository.findAndCount({
          // relations: ['products'],
        });
        const data = supplier.map(value => toSupplierModel(value));
        return toSupplierDto(data, count);
      }
    } catch (error) {
      logger.error(`findAll: ${error}`);
      throw new BadRequestException({ message: 'Product not found' });
    }
  }

  async findSupplierProduct(): Promise<SupplierProduct[]> {
    const supplierProduct: SupplierProduct[] = await this.supplierProductRepository.createQueryBuilder('supplier_product')
      .leftJoinAndSelect('supplier_product.product', 'product')
      .leftJoinAndSelect('supplier_product.supplier', 'supplier')
      .leftJoinAndSelect('supplier_product.product_type', 'product_type')
      .orderBy('supplier_product.id')
      .getMany();

    return supplierProduct;
  }

  /**
   * find supplier data
   * return SupplierDto
   * not select relation
   */
  async find(): Promise<SupplierDto> {
    try {
      const [supplier, count] = await this.supplierRepository.findAndCount();
      const data = supplier.map(value => toSupplierModel(value));
      return toSupplierDto(data, count);
    } catch (error) {
      logger.error(`find: ${error}`);
      throw new BadRequestException({ message: 'Supplier not found' });
    }
  }

  /**
   * find supplier data by id
   * return Supplier Entity
   */
  async findOne(id: number): Promise<Supplier> {
    try {
      return await this.supplierRepository.findOneOrFail(id);
    } catch (error) {
      logger.warn(`findOne : ${error}`);
      throw new BadRequestException({ message: 'Supplier not found' });
    }
  }

  /**
   * find supplier data by id
   * return SupplierDto
   */
  async findById(id: number): Promise<SupplierDto> {
    try {
      const supplier = await this.findOne(id);
      const data = toSupplierModel(supplier);
      return toSupplierDto(data);
    } catch (error) {
      throw new BadRequestException({ message: 'Supplier not found' });
    }
  }
  /**
   * Update supplier row data that matches given id
   * return SupplierDto
   */
  async update(id: number, updateSupplierDto: UpdateSupplierDto): Promise<SupplierDto> {
    const supplier = await this.findOne(id);
    if (!supplier) {
      throw new BadRequestException({ message: 'Supplier not found' });
    }
    try {
      updateSupplierDto.phone = updateSupplierDto.phone != '' ? '09' + updateSupplierDto.phone : '';
      updateSupplierDto.updated_at = new Date();
      const supplierToUpdate = Object.assign(supplier, updateSupplierDto);
      await this.supplierRepository.update(id, supplierToUpdate);
    } catch (error) {
      logger.error(`update : ${error}`);
      throw new InternalServerErrorException({ message: 'Update fail' })
    }
    const updateSupplier = await this.findOne(supplier.id);
    const data = toSupplierModel(updateSupplier);
    return toSupplierDto(data);
  }

  /**
   * Delete entre supplier row data that matches given id.
   */
  async remove(id: number): Promise<SupplierDto> {
    const supplier = await this.supplierRepository.findOne(id);
    if (!supplier) {
      throw new BadRequestException({ message: 'Supplier not found' });
    }
    // if (supplier.products.length > 0) {
    //   throw new BadRequestException({ message: `Can't delete this supplier. This supplier have related products. If you want to delete this supplier, first delete related products.` });
    // }
    const deleteSupplier = await this.supplierRepository.remove(supplier);
    const data = toSupplierModel(deleteSupplier);
    return toSupplierDto(data);
  }
}
