import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toProductDto } from 'src/helper/mapper/product.maper';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
const logger = new Logger('ProductService');

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) { }
  /**
   * create new product data
   * return ProductDto
   */
  async create(createProductDto: CreateProductDto): Promise<ProductDto> {
    const { product_name, product_code } = createProductDto;

    const productNameInDb = await this.productRepository.findOne({ where: { product_name } });
    if (productNameInDb) {
      throw new BadRequestException({ message: 'Product name already exit' });
    }
    const productCodeInDb = await this.productRepository.findOne({ where: { product_code } });
    if (productCodeInDb) {
      throw new BadRequestException({ message: 'Product code already exit' });
    }
    const product: Product = this.productRepository.create(createProductDto);
    try {
      await this.productRepository.save(product);
    } catch (error) {
      logger.error(`create: ${error}`);
      throw new InternalServerErrorException({ message: 'Create product fail' });
    }
    return toProductDto(product);
  }

  /**
   * find product data
   * return ProductDto[]
   */
  async findAll(protuct_name?: string, product_code?: string): Promise<ProductDto[]> {
    try {
      if (protuct_name) {
        const product = await this.productRepository.find({ where: { protuct_name } });
        return product.map(data => toProductDto(data));
      }
      else if (product_code) {
        const product = await this.productRepository.find({ where: { product_code } });
        return product.map(data => toProductDto(data));
      } else {
        const product = await this.productRepository.find();
        return product.map(data => toProductDto(data));
      }
    } catch (error) {
      logger.error(`findAll: ${error}`);
      throw new BadRequestException({ message: 'Product not found' });
    }
  }

  /**
   * find product data by id
   * return Product Entity
   */
  async findOne(id: number): Promise<Product> {
    try {
      return await this.productRepository.findOneOrFail(id);
    } catch (error) {
      logger.warn(`findOne : ${error}`);
      throw new BadRequestException({ message: 'Product not found' });
    }
  }

  /**
   * find product data by id
   * return ProductDto
   */
  async findById(id: number): Promise<ProductDto> {
    try {
      const product = await this.findOne(id);
      return toProductDto(product)
    } catch (error) {
      throw new BadRequestException({ message: 'Product not found' });
    }
  }

  /**
   * Update product row data that matches given id
   * return ProductDto
   */
  async update(id: number, updateProductDto: UpdateProductDto): Promise<ProductDto> {
    const product = await this.findOne(id);
    if (!product) {
      throw new BadRequestException({ message: 'Product not found' });
    }
    try {
      const productToUpdate = Object.assign(product, updateProductDto);
      await this.productRepository.update(id, productToUpdate);
    } catch (error) {
      logger.error(`update : ${error}`);
      throw new InternalServerErrorException({ message: 'Update product fail' })
    }
    const updateProduct = await this.findOne(product.id);
    return toProductDto(updateProduct);
  }

  /**
   * Delete entire product type row data that matches given id.
   * return ProductDto
   */
  async remove(id: number): Promise<ProductDto> {
    const product = await this.findOne(id);
    if (!product) {
      throw new BadRequestException({ message: 'Product not found' });
    }
    const deleteProduct = await this.productRepository.remove(product);
    return toProductDto(deleteProduct);
  }
}
