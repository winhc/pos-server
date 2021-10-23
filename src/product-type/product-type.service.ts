import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toProductTypeDto, toProductTypeModel } from 'src/helper/mapper/product-type.mapper';
import { formattedDate } from 'src/helper/utils';
import { Like, Repository } from 'typeorm';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { ProductTypeDto } from './dto/product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { ProductType } from './entities/product-type.entity';
const logger = new Logger('ProductTypeService');

@Injectable()
export class ProductTypeService {
  constructor(@InjectRepository(ProductType) private readonly productTypeRepository: Repository<ProductType>) { }
  /**
   * create new product type data
   * return ProductTypeDto
   */
  async create(createProductTypeDto: CreateProductTypeDto): Promise<ProductTypeDto> {
    const { product_type_name } = createProductTypeDto;

    const productTypeInDb = await this.productTypeRepository.findOne({ where: { product_type_name } });
    if (productTypeInDb) {
      throw new BadRequestException({ message: 'Product type already exit' });
    }
    const productType: ProductType = this.productTypeRepository.create(createProductTypeDto);
    try {
      await this.productTypeRepository.save(productType);
    } catch (error) {
      logger.error(`create: ${error}`);
      throw new InternalServerErrorException({ message: 'Create product type fail' });
    }
    const data = toProductTypeModel(productType)
    return toProductTypeDto(data);
  }

  /**
   * find product type data
   * return ProductTypeDto
   */
  async findAll(page_size?: number, page_index?: number, product_type_name?: string, from_date?: string, to_date?: string): Promise<ProductTypeDto> {
    logger.log(`page_size: ${page_size}, page_index: ${page_index}, product_type_name: ${product_type_name}, from_date: ${from_date}, to_date: ${to_date}`)
    try {
      // Option 1
      if (product_type_name && from_date && to_date && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [product_type, count] = await this.productTypeRepository.createQueryBuilder('product_type')
          .where('DATE(product_type.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
          .andWhere('product_type.product_type_name LIKE :pt_name', { pt_name: `%${product_type_name}%` })
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('product_type.products', 'products')
          .orderBy('product_type.id')
          .getManyAndCount()

        logger.log(`product_type => ${product_type}, count => ${count}`);
        const data = product_type.map(value => toProductTypeModel(value));
        return toProductTypeDto(data, count);
      }
      // Option 2
      else if (from_date && to_date && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [product_type, count] = await this.productTypeRepository.createQueryBuilder('product_type')
          .where('DATE(product_type.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('product_type.products', 'products')
          .orderBy('product_type.id')
          .getManyAndCount()

        logger.log(`product_type => ${product_type}, count => ${count}`);
        const data = product_type.map(value => toProductTypeModel(value));
        return toProductTypeDto(data, count);
      }
      // Option 3
      else if (product_type_name && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [product_type, count] = await this.productTypeRepository.findAndCount({
          relations: ['products'],
          skip: fromIndex,
          take: takeLimit,
          where: { product_type_name: Like(`%${product_type_name}%`) }
        });
        logger.log(`product_type => ${product_type}, count: ${count}`);
        const data = product_type.map(value => toProductTypeModel(value));
        return toProductTypeDto(data, count)
      }
      // Option 4
      else if (page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [product_type, count] = await this.productTypeRepository.findAndCount({
          relations: ['products'],
          skip: fromIndex,
          take: takeLimit
        });
        logger.log(`product_type => ${product_type}, count: ${count}`);
        const data = product_type.map(value => toProductTypeModel(value));
        return toProductTypeDto(data, count)
      }
      // Option 5
      else {
        const [product_type, count] = await this.productTypeRepository.findAndCount({
          relations: ['products'],
        });
        const data = product_type.map(value => toProductTypeModel(value));
        return toProductTypeDto(data, count);
      }
    } catch (error) {
      logger.error(`findAll: ${error}`);
      throw new BadRequestException({ message: 'Product not found' });
    }
  }

  /**
   * find product type data
   * return ProductTypeDto
   * not select relation
   */
   async find(): Promise<ProductTypeDto> {
    try {
      const [supplier, count] = await this.productTypeRepository.findAndCount();
      const data = supplier.map(value => toProductTypeModel(value));
      return toProductTypeDto(data, count);
    } catch (error) {
      logger.error(`find: ${error}`);
      throw new BadRequestException({ message: 'Product type not found' });
    }
  }

  /**
   * find product type data by id
   * return ProductType Entity
   */
  async findOne(id: number): Promise<ProductType> {
    try {
      return await this.productTypeRepository.findOneOrFail({ where: { id }, relations: ['products'] });
    } catch (error) {
      logger.warn(`findOne : ${error}`);
      throw new BadRequestException({ message: 'Product type not found' });
    }
  }

  /**
   * find product type data by id
   * return ProductTypeDto
   */
  async findById(id: number): Promise<ProductTypeDto> {
    try {
      const productType = await this.findOne(id);
      const data = toProductTypeModel(productType)
      return toProductTypeDto(data);
    } catch (error) {
      throw new BadRequestException({ message: 'Product type not found' });
    }
  }

  /**
   * Update product type row data that matches given id
   * return ProductTypeDto
   */
  async update(id: number, updateProductTypeDto: UpdateProductTypeDto): Promise<ProductTypeDto> {
    const product_type = await this.findOne(id);
    if (!product_type) {
      throw new BadRequestException({ message: 'Product type not found' });
    }
    try {
      updateProductTypeDto.updated_at = new Date();
      const productTypeToUpdate = Object.assign(product_type, updateProductTypeDto);
      await this.productTypeRepository.update(id, productTypeToUpdate);
    } catch (error) {
      logger.error(`update : ${error}`);
      throw new InternalServerErrorException({ message: 'Update product type fail' })
    }
    const updateProductType = await this.findOne(product_type.id);
    const data = toProductTypeModel(updateProductType);
    return toProductTypeDto(data);
  }

  /**
   * Delete entire product type row data that matches given id.
   * return ProductTypeDto
   */
  async remove(id: number): Promise<ProductTypeDto> {
    const product_type = await this.findOne(id);
    if (!product_type) {
      throw new BadRequestException({ message: 'Product type not found' });
    }
    if (product_type.products.length > 0) {
      throw new BadRequestException({ message: `Can't delete this product type. This product type have related products. If you want to delete this product type, first delete related products.` });
    }
    const deleteProductType = await this.productTypeRepository.remove(product_type);
    const data = toProductTypeModel(deleteProductType);
    return toProductTypeDto(data);
  }
}
