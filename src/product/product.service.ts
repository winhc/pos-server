import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandService } from 'src/brand/brand.service';
import { toProductDto, toProductModel } from 'src/helper/mapper/product.maper';
import { ProductTypeService } from 'src/product-type/product-type.service';
import { Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductOptionDto } from './dto/product-option.dto';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { formattedDate } from 'src/helper/utils';
import { CategoryService } from 'src/category/category.service';
import { SupplierService } from 'src/supplier/supplier.service';
const logger = new Logger('ProductService');

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    private readonly brandService: BrandService,
    private readonly categoryService: CategoryService,
    private readonly productTypeService: ProductTypeService,
    private readonly supplierService: SupplierService,
    ) { }
  /**
   * create new product data
   * return ProductDto
   */
  async create(createProductDto: CreateProductDto, image_name?: string): Promise<ProductDto> {
    createProductDto.image = image_name;
    const tempForSale = createProductDto.for_sale + '';
    createProductDto.for_sale = tempForSale == 'true' ? true : false;
    const { product_name, product_code } = createProductDto;

    // logger.log(`type of for_sale => ${typeof createProductDto.for_sale}`)
    // logger.log(`for_sale => ${createProductDto.for_sale}`)

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
    const data = toProductModel(product);
    return toProductDto(data);
  }

  /**
   * find product data
   * return ProductDto
   */
  async findAll(protuct_name?: string, page_size?: number, page_index?: number, from_date?: string, to_date?: string): Promise<ProductDto> {
    logger.log(`page_size: ${page_size}, page_index: ${page_index}, protuct_name: ${protuct_name}, from_date: ${from_date}, to_date: ${to_date}`)
    try {
      // Option 1
      if (protuct_name && from_date && to_date && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        /*
        * using query Builder
        * return Raw query result
        * In here, I don't use this (query Builder)
        * Because, Entity query is more suitable than Raw query in a relation result
        */
        // const product = await this.productRepository.createQueryBuilder('product')
        //   .select('*')
        //   .addSelect('COUNT(*) OVER () AS count')
        //   .where('DATE(product.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
        //   .andWhere('product.product_name LIKE :p_name', { p_name: `%${protuct_name}%` })
        //   .skip(fromIndex)
        //   .take(takeLimit)
        //   .orderBy('product.id')
        //   .getRawMany();
        // const data = product.map(value => toProductModel(value));
        // const count = parseInt(product[0]?.count);
        // return toProductDto(data, count);

        /*
        * using find Option
        * return Entity query result
        */
        const [product, count] = await this.productRepository.createQueryBuilder('product')
          .where('DATE(product.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
          .andWhere('product.product_name LIKE :p_name', { p_name: `%${protuct_name}%` })
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('product.category', 'category')
          .leftJoinAndSelect('product.brand', 'brand')
          .leftJoinAndSelect('product.product_type', 'product_type')
          .leftJoinAndSelect('product.supplier', 'supplier')
          .orderBy('product.id')
          .getManyAndCount()

        logger.log(`product => ${product}, count => ${count}`);
        const data = product.map(value => toProductModel(value));
        return toProductDto(data, count);
      }
      // Option 2
      else if (from_date && to_date && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [product, count] = await this.productRepository.createQueryBuilder('product')
          .where('DATE(product.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('product.category', 'category')
          .leftJoinAndSelect('product.brand', 'brand')
          .leftJoinAndSelect('product.product_type', 'product_type')
          .leftJoinAndSelect('product.supplier', 'supplier')
          .orderBy('product.id')
          .getManyAndCount()

        logger.log(`product => ${product}, count => ${count}`);
        const data = product.map(value => toProductModel(value));
        return toProductDto(data, count);
      }
      // Option 3
      else if (protuct_name && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [product, count] = await this.productRepository.findAndCount({
          relations: ['category', 'product_type', 'brand', 'supplier'],
          skip: fromIndex,
          take: takeLimit,
          where: { product_name: Like(`%${protuct_name}%`) }
        });
        logger.log(`product => ${product}, count: ${count}`);
        const data = product.map(value => toProductModel(value));
        return toProductDto(data, count)
      }
      // Option 4
      else if (page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [product, count] = await this.productRepository.findAndCount({
          relations: ['category', 'product_type', 'brand', 'supplier'],
          skip: fromIndex,
          take: takeLimit
        });
        logger.log(`product => ${product}, count: ${count}`);
        const data = product.map(value => toProductModel(value));
        return toProductDto(data, count)
      }
      // Option 5
      else {
        const [product, count] = await this.productRepository.findAndCount({
          relations: ['category', 'product_type', 'brand', 'supplier']
        });
        const data = product.map(value => toProductModel(value));
        return toProductDto(data, count);
      }
    } catch (error) {
      logger.error(`findAll: ${error}`);
      throw new BadRequestException({ message: 'Product not found' });
    }
  }

  async findProductOption(): Promise<ProductOptionDto> {
    const brandData = await this.brandService.find();
    const categoryData = await this.categoryService.find();
    const productTypeData = await this.productTypeService.find();
    const supplierDto = await this.supplierService.find();
    const data: ProductOptionDto = {
      brand: brandData,
      category: categoryData,
      product_type: productTypeData,
      supplier: supplierDto
    };
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
   * find image
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
   * Update product row data that matches given id
   * return ProductDto
   */
  async update(id: number, updateProductDto: UpdateProductDto, image_name?: string): Promise<ProductDto> {
    const product = await this.findOne(id);
    if (!product) {
      throw new BadRequestException({ message: 'Product not found' });
    }
    try {
      updateProductDto.image = image_name;
      updateProductDto.updated_at = new Date();

      const tempForSale = updateProductDto.for_sale + '';
      updateProductDto.for_sale = tempForSale == 'true' ? true : false;

      const productToUpdate = Object.assign(product, updateProductDto);
      await this.productRepository.update(id, productToUpdate);
    } catch (error) {
      logger.error(`update : ${error}`);
      throw new InternalServerErrorException({ message: 'Update product fail' })
    }
    const updateProduct = await this.findOne(product.id);
    const data = toProductModel(updateProduct);
    return toProductDto(data);
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
}
