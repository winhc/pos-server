import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandService } from 'src/brand/brand.service';
import { toProductDto, toProductModel } from 'src/helper/mapper/product.maper';
import { ProductTypeService } from 'src/product-type/product-type.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductOptionDto } from './dto/product-option.dto';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { formattedDate } from 'src/helper/utils';
import { CategoryService } from 'src/category/category.service';
import { Order } from 'src/order/entities/order.entity';
const logger = new Logger('ProductService');

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    private readonly brandService: BrandService,
    private readonly categoryService: CategoryService,
    private readonly productTypeService: ProductTypeService,
  ) { }
  /**
   * Create new product data
   * and Create new product and supplier relation
   * return ProductDto
   */
  async create(createProductDto: CreateProductDto, image_name?: string): Promise<ProductDto> {
    createProductDto.image = image_name;
    const { product_name, product_code, brand } = createProductDto;
    const brand_id = JSON.stringify(brand);
    if (brand_id == '""') {
      createProductDto.brand = null;
    }
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
      throw new InternalServerErrorException({ message: 'Create products fail' });
    }
    const data = toProductModel(product);
    return toProductDto(data);
  }

  /**
   * find product data
   * return ProductDto
   */
  async findAll(product_name?: string, page_size?: number, page_index?: number, from_date?: string, to_date?: string): Promise<ProductDto> {
    logger.log(`page_size: ${page_size}, page_index: ${page_index}, product_name: ${product_name}, from_date: ${from_date}, to_date: ${to_date}`)
    try {

      // Option 1
      if (product_name && from_date && to_date && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        /**
         * Method 1
         * using query Builder
         * return Raw query result
         * In here, I don't use this (query Builder)
         * Because, Entity query is more suitable than Raw query in a relation result
         */
        // const product = await this.productRepository.createQueryBuilder('product')
        //   .select('*')
        //   .addSelect('COUNT(*) OVER () AS count')
        //   .where('DATE(product.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
        //   .andWhere('product.product_name LIKE :p_name', { p_name: `%${product_name}%` })
        //   .skip(fromIndex)
        //   .take(takeLimit)
        //   .orderBy('product.id')
        //   .getRawMany();
        // const data = product.map(value => toProductModel(value));
        // const count = parseInt(product[0]?.count);
        // return toProductDto(data, count);

        /**
         * Method 2
         * use findAndCount Option
         */
        // const [product, count] = await this.productRepository.findAndCount({
        //   relations: ['category', 'product_type', 'brand', 'supplier_product'],
        //   skip: fromIndex,
        //   take: takeLimit,
        //   where: { product_name: Like(`%${product_name}%`) }
        // });

        /**
         * Method 3
         * using find Option 
         * return Entity query result
         */
        const [product, count] = await this.productRepository.createQueryBuilder('product')
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('product.category', 'category')
          .leftJoinAndSelect('product.brand', 'brand')
          .leftJoinAndSelect('product.product_type', 'product_type')
          .where('DATE(product.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
          .andWhere('product.product_name LIKE :p_name', { p_name: `%${product_name}%` })
          .orderBy('product.id')
          .getManyAndCount()
        const data = product.map(value => toProductModel(value));
        return toProductDto(data, count);
      }
      // Option 2
      else if (from_date && to_date && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [product, count] = await this.productRepository.createQueryBuilder('product')
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('product.category', 'category')
          .leftJoinAndSelect('product.brand', 'brand')
          .leftJoinAndSelect('product.product_type', 'product_type')
          .where('DATE(product.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
          .orderBy('product.id')
          .getManyAndCount()
        const data = product.map(value => toProductModel(value));
        return toProductDto(data, count);
      }
      // Option 3
      else if (product_name && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [product, count] = await this.productRepository.createQueryBuilder('product')
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('product.category', 'category')
          .leftJoinAndSelect('product.brand', 'brand')
          .leftJoinAndSelect('product.product_type', 'product_type')
          .where('product.product_name LIKE :p_name', { p_name: `%${product_name}%` })
          .orderBy('product.id')
          .getManyAndCount()
        const data = product.map(value => toProductModel(value));
        return toProductDto(data, count)
      }
      // Option 4
      else if (page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [product, count] = await this.productRepository.createQueryBuilder('product')
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('product.category', 'category')
          .leftJoinAndSelect('product.brand', 'brand')
          .leftJoinAndSelect('product.product_type', 'product_type')
          .orderBy('product.id')
          .getManyAndCount()
        const data = product.map(value => toProductModel(value));
        return toProductDto(data, count)
      }
      // Option 5
      else {
        const [product, count] = await this.productRepository.createQueryBuilder('product')
          .leftJoinAndSelect('product.category', 'category')
          .leftJoinAndSelect('product.brand', 'brand')
          .leftJoinAndSelect('product.product_type', 'product_type')
          .orderBy('product.id')
          .getManyAndCount()
        const data = product.map(value => toProductModel(value));
        return toProductDto(data, count);
      }
    } catch (error) {
      logger.error(`findAll: ${error}`);
      throw new BadRequestException({ message: 'Product not found' });
    }
  }

  /**
   * find categoty, brand and product_type
   * for product options
   */
  async findProductOption(): Promise<ProductOptionDto> {
    const category = await this.categoryService.find();
    const brand = await this.brandService.find();
    const product_type = await this.productTypeService.find();
    const data: ProductOptionDto = { category, brand, product_type };
    return data;
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
      const data = toProductModel(product);
      return toProductDto(data);
    } catch (error) {
      throw new BadRequestException({ message: 'Product not found' });
    }
  }

  /**
   * find product image
   */
  async findImage(id: number, image: string): Promise<ProductDto> {
    try {
      const productInDb = await this.findOne(id);
      if (!productInDb) {
        throw new BadRequestException({ message: 'Product not found' });
      } else {
        const product = await this.productRepository.findOne({ where: { image } });
        const data = toProductModel(product);
        return toProductDto(data);
      }
    } catch (error) {
      throw new BadRequestException({ message: 'product not found' });
    }
  }

  /**
   * Update product row data that matches given id into product table
   * Update supplier and product into relation table
   * return ProductDto
   */
  async update(id: number, updateProductDto: UpdateProductDto, image_name?: string): Promise<ProductDto> {
    const product = await this.findOne(id);
    if (!product) {
      throw new BadRequestException({ message: 'Product not found' });
    }
    try {
      const { brand } = updateProductDto;
      const brand_id = JSON.stringify(brand);
      if (brand_id == '""') {
        updateProductDto.brand = null;
      }
      updateProductDto.image = image_name;
      updateProductDto.updated_at = new Date();
      // updateProductDto.quantity = updateProductDto.quantity + product.quantity;
      // updateProductDto.alert_quantity = updateProductDto.alert_quantity + product.alert_quantity;

      const productToUpdate = Object.assign(product, updateProductDto);
      await this.productRepository.update(id, productToUpdate);
    } catch (error) {
      logger.error(`update : ${error}`);
      throw new InternalServerErrorException({ message: 'Update products fail' })
    }
    const updateProduct = await this.findOne(product.id);
    const data = toProductModel(updateProduct);
    return toProductDto(data);
  }

  async updatePurchaseProduct(id: number, new_quantity: number): Promise<ProductDto> {
    const product = await this.findOne(id);
    if (!product) {
      throw new BadRequestException({ message: 'Product not found' });
    }
    try {
      const quantity = product.quantity + new_quantity;
      const updated_at = new Date();
      const updateProductObj = {
        quantity,
        updated_at
      };
      const productToUpdate = Object.assign(product, updateProductObj);
      await this.productRepository.update(id, productToUpdate);
    } catch (error) {
      logger.error(`update : ${error}`);
      throw new InternalServerErrorException({ message: 'Update products fail' })
    }
    const updateProduct = await this.findOne(product.id);
    const data = toProductModel(updateProduct);
    return toProductDto(data);
  }

  async updateOrdrProduct(orderList: Order[]): Promise<any> {
    logger.log(`orderList: ${JSON.stringify(orderList)}`);
    for (const data of orderList) {
      const id = +JSON.stringify(data.product);
      const product = await this.findOne(id);
      const quantity = product.quantity - data.quantity;
      const updateProductObj = {
        quantity
      };
      const updateProduct = Object.assign(product, updateProductObj);
      await this.productRepository.update(id, updateProduct)
    }
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
    const data = toProductModel(deleteProduct);
    return toProductDto(data);
  }

  async findProductShop(category_id?: number, product_name?: string): Promise<ProductDto> {
    if (category_id == 0 && product_name) { // all category and product_name
      const [product, count] = await this.productRepository.createQueryBuilder('product')
        .where('product.quantity > ' + 0)
        .andWhere('product.product_name LIKE :p_name', { p_name: `%${product_name}%` })
        .orderBy('product.id')
        .getManyAndCount()
      const data = product.map(value => toProductModel(value));
      return toProductDto(data, count);
    } else if (category_id != 0 && product_name) { // selected category and product_name
      const [product, count] = await this.productRepository.createQueryBuilder('product')
        .leftJoin('product.category', 'category')
        .where('product.quantity > ' + 0)
        .andWhere('category.id = :c_id', { c_id: category_id })
        .andWhere('product.product_name LIKE :p_name', { p_name: `%${product_name}%` })
        .orderBy('product.id')
        .getManyAndCount()
      const data = product.map(value => toProductModel(value));
      return toProductDto(data, count);
    } else if (category_id == 0) { // all category , without product_name
      const [product, count] = await this.productRepository.createQueryBuilder('product')
        .where('product.quantity > ' + 0)
        .orderBy('product.id')
        .getManyAndCount()
      const data = product.map(value => toProductModel(value));
      return toProductDto(data, count);
    } else if (category_id != 0) { // selected category , without product_name
      const [product, count] = await this.productRepository.createQueryBuilder('product')
        .leftJoin('product.category', 'category')
        .where('product.quantity > ' + 0)
        .andWhere('category.id = :c_id', { c_id: category_id })
        .orderBy('product.id')
        .getManyAndCount()
      const data = product.map(value => toProductModel(value));
      return toProductDto(data, count);
    }
  }
}
