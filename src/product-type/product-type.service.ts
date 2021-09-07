import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toProductTypeDto } from 'src/helper/mapper/product-type.mapper';
import { Repository } from 'typeorm';
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
    const { protuct_type_name } = createProductTypeDto;

    const productTypeInDb = await this.productTypeRepository.findOne({ where: { protuct_type_name } });
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
    return toProductTypeDto(productType);
  }

  /**
   * find product type data
   * return ProductTypeDto[]
   */
  async findAll(protuct_type_name?: string): Promise<ProductTypeDto[]> {
    try {
      if (protuct_type_name) {
        const product_type = await this.productTypeRepository.find({ where: { protuct_type_name } });
        return product_type.map(data => toProductTypeDto(data));
      } else {
        const product_type = await this.productTypeRepository.find();
        return product_type.map(data => toProductTypeDto(data));
      }
    } catch (error) {
      logger.error(`findAll: ${error}`);
      throw new BadRequestException({ message: 'Product type not found' });
    }
  }

  /**
   * find product type data by id
   * return ProductType Entity
   */
  async findOne(id: number): Promise<ProductType> {
    try {
      return await this.productTypeRepository.findOneOrFail(id);
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
      const product_type = await this.findOne(id);
      return toProductTypeDto(product_type)
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
      const productTypeToUpdate = Object.assign(product_type, updateProductTypeDto);
      await this.productTypeRepository.update(id, productTypeToUpdate);
    } catch (error) {
      logger.error(`update : ${error}`);
      throw new InternalServerErrorException({ message: 'Update product type fail' })
    }
    const updateProductType = await this.findOne(product_type.id);
    return toProductTypeDto(updateProductType);
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
    const deleteProductType = await this.productTypeRepository.remove(product_type);
    return toProductTypeDto(deleteProductType);
  }
}
