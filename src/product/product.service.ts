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
import { CreateSupplierProductDto } from 'src/supplier/dto/create-supplier-product.dto';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { SupplierProduct } from 'src/supplier/entities/supplier-product.entity';
import { UpdateSupplierProductDto } from 'src/supplier/dto/update-supplier-product.dto';
import { ImportProductDto } from './dto/import-product.dto';
const logger = new Logger('ProductService');

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Supplier) private readonly supplierRepository: Repository<Supplier>,
    @InjectRepository(SupplierProduct) private readonly supplierProductRepository: Repository<SupplierProduct>,
    private readonly brandService: BrandService,
    private readonly categoryService: CategoryService,
    private readonly productTypeService: ProductTypeService,
    private readonly supplierService: SupplierService,
  ) { }
  /**
   * Create new product data
   * and Create new product and supplier relation
   * return ProductDto
   */
  async create(createProductDto: CreateProductDto, image_name?: string): Promise<ProductDto> {
    createProductDto.image = image_name;
    const { product_name, product_code, supplier } = createProductDto;

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
      const createProduct = await this.productRepository.save(product);
      if (createProduct.id > 0) {
        const createSupplierProductDto: CreateSupplierProductDto = {
          product: product,
          supplier: createProductDto.supplier,
          product_type: createProductDto.product_type,
          quantity: createProductDto.quantity,
          cost: createProductDto.cost,
          alert_quantity: createProductDto.alert_quantity,
          expiry_at: createProductDto.expiry_at,
          remarks: createProductDto.remarks
        };
        await this.supplierService.createSupplierProduct(createSupplierProductDto);
      } else {
        throw new InternalServerErrorException({ message: 'Create product fail' });
      }
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
  async findAll(protuct_name?: string, page_size?: number, page_index?: number, from_date?: string, to_date?: string): Promise<ProductDto> {
    logger.log(`page_size: ${page_size}, page_index: ${page_index}, protuct_name: ${protuct_name}, from_date: ${from_date}, to_date: ${to_date}`)
    try {

      const supplierQb = await this.supplierRepository.createQueryBuilder('supplier')
        .select('supplier.id');

      // Option 1
      if (protuct_name && from_date && to_date && page_size && page_index) {
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
        //   .andWhere('product.product_name LIKE :p_name', { p_name: `%${protuct_name}%` })
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
        //   where: { product_name: Like(`%${protuct_name}%`) }
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
          // .leftJoinAndSelect('product.product_type', 'product_type')
          .leftJoinAndSelect('product.supplier_product', 'supplier_product')
          .leftJoinAndSelect('supplier_product.supplier', 'product_supplier')
          .leftJoinAndSelect('supplier_product.product_type', 'product_type')
          .where('DATE(product.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
          .andWhere('product.product_name LIKE :p_name', { p_name: `%${protuct_name}%` })
          .andWhere('product_supplier.id IN (' + supplierQb.getQuery() + ')')
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
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('product.category', 'category')
          .leftJoinAndSelect('product.brand', 'brand')
          // .leftJoinAndSelect('product.product_type', 'product_type')
          .leftJoinAndSelect('product.supplier_product', 'supplier_product')
          .leftJoinAndSelect('supplier_product.supplier', 'product_supplier')
          .leftJoinAndSelect('supplier_product.product_type', 'product_type')
          .where('DATE(product.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
          .andWhere('product_supplier.id IN (' + supplierQb.getQuery() + ')')
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

        const [product, count] = await this.productRepository.createQueryBuilder('product')
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('product.category', 'category')
          .leftJoinAndSelect('product.brand', 'brand')
          // .leftJoinAndSelect('product.product_type', 'product_type')
          .leftJoinAndSelect('product.supplier_product', 'supplier_product')
          .leftJoinAndSelect('supplier_product.supplier', 'product_supplier')
          .leftJoinAndSelect('supplier_product.product_type', 'product_type')
          .where('product.product_name LIKE :p_name', { p_name: `%${protuct_name}%` })
          .andWhere('product_supplier.id IN (' + supplierQb.getQuery() + ')')
          .orderBy('product.id')
          .getManyAndCount()


        logger.log(`product => ${product}, count: ${count}`);
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
          // .leftJoinAndSelect('product.product_type', 'product_type')
          .leftJoinAndSelect('product.supplier_product', 'supplier_product')
          .leftJoinAndSelect('supplier_product.supplier', 'product_supplier')
          .leftJoinAndSelect('supplier_product.product_type', 'product_type')
          .where('product_supplier.id IN (' + supplierQb.getQuery() + ')')
          .orderBy('product.id')
          .getManyAndCount()

        logger.log(`product => ${product}, count: ${count}`);
        const data = product.map(value => toProductModel(value));
        return toProductDto(data, count)
      }
      // Option 5
      else {
        const [product, count] = await this.productRepository.createQueryBuilder('product')
          .leftJoinAndSelect('product.category', 'category')
          .leftJoinAndSelect('product.brand', 'brand')
          // .leftJoinAndSelect('product.product_type', 'product_type')
          .leftJoinAndSelect('product.supplier_product', 'supplier_product')
          .leftJoinAndSelect('supplier_product.supplier', 'product_supplier')
          .leftJoinAndSelect('supplier_product.product_type', 'product_type')
          .where('product_supplier.id IN (' + supplierQb.getQuery() + ')')
          .orderBy('product.id')
          .getManyAndCount()

        logger.log(`product => ${product}, count: ${count}`);
        const data = product.map(value => toProductModel(value));
        return toProductDto(data, count);
      }
    } catch (error) {
      logger.error(`findAll: ${error}`);
      throw new BadRequestException({ message: 'Product not found' });
    }
  }

  /**
   * find categoty, brand, product_type and supplier
   * for product options
   */
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
  async update(id: number, supplier_product_id: number, updateProductDto: UpdateProductDto, image_name?: string): Promise<ProductDto> {
    const product = await this.findOne(id);
    if (!product) {
      throw new BadRequestException({ message: 'Product not found' });
    }
    try {
      updateProductDto.image = image_name;
      updateProductDto.updated_at = new Date();

      const updateProductData = new UpdateProductDto();
      updateProductData.bar_code = updateProductDto.bar_code;
      updateProductData.product_name = updateProductDto.product_name;
      updateProductData.category = updateProductDto.category;
      updateProductData.brand = updateProductDto.brand;
      updateProductData.image = updateProductDto.image;
      updateProductData.cost = updateProductDto.cost;
      updateProductData.quantity = updateProductDto.quantity;
      updateProductData.alert_quantity = updateProductDto.alert_quantity;
      updateProductData.remarks = updateProductDto.remarks;
      updateProductData.updated_at = updateProductDto.updated_at;

      const productToUpdate = Object.assign(product, updateProductData);
      const updateResult = await this.productRepository.update(id, productToUpdate);
      if (updateResult.affected > 0) {
        const updateSupplierProductDto: UpdateSupplierProductDto = {
          product: product,
          supplier: updateProductDto.supplier,
          product_type: updateProductDto.product_type,
          quantity: updateProductDto.quantity,
          cost: updateProductDto.cost,
          alert_quantity: updateProductDto.alert_quantity,
          expiry_at: updateProductDto.expiry_at,
          remarks: updateProductDto.remarks,
          updated_at: updateProductDto.updated_at
        };
        await this.supplierService.updateSupplierProduct(supplier_product_id, updateSupplierProductDto);
      } else {
        throw new InternalServerErrorException({ message: 'Update product fail' })
      }
    } catch (error) {
      logger.error(`update : ${error}`);
      throw new InternalServerErrorException({ message: 'Update products fail' })
    }
    const updateProduct = await this.findOne(product.id);
    const data = toProductModel(updateProduct);
    return toProductDto(data);
  }

  /**
   * Update product row data that matches given id into product table
   * Insert new records into supplier and product in relation table
   * return ProductDto
   */
  async importProduct(id: number, importProductDto: ImportProductDto): Promise<ProductDto> {
    const product = await this.findOne(id);
    if (!product) {
      throw new BadRequestException({ message: 'Product not found' });
    }
    try {
      importProductDto.updated_at = new Date();

      const importProductData = new ImportProductDto();
      importProductData.cost = product.cost + importProductDto.cost;
      importProductData.quantity = product.quantity + importProductDto.quantity;
      importProductData.alert_quantity = product.alert_quantity + importProductDto.alert_quantity;
      importProductData.remarks = importProductDto.remarks;
      importProductData.updated_at = importProductDto.updated_at;

      const productToUpdate = Object.assign(product, importProductData);
      const updateResult = await this.productRepository.update(id, productToUpdate);
      if (updateResult.affected > 0) {
        const createSupplierProductDto: CreateSupplierProductDto = {
          product: product,
          supplier: importProductDto.supplier,
          product_type: importProductDto.product_type,
          quantity: importProductDto.quantity,
          cost: importProductDto.cost,
          alert_quantity: importProductDto.alert_quantity,
          expiry_at: importProductDto.expiry_at,
          remarks: importProductDto.remarks
        };
        await this.supplierService.createSupplierProduct(createSupplierProductDto);
      } else {
        throw new InternalServerErrorException({ message: 'Update product fail' })
      }
    } catch (error) {
      logger.error(`update : ${error}`);
      throw new InternalServerErrorException({ message: 'Update products fail' })
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
    if (product) {
      const deleteResult = await this.supplierProductRepository.createQueryBuilder('supplier_product')
        .delete()
        .where('supplier_product.productId = :product_id', { product_id: id })
        .execute();

      if (deleteResult.affected > 0) {
        const deleteProduct = await this.productRepository.remove(product);
        const data = toProductModel(deleteProduct);
        return toProductDto(data);
      } else {
        throw new InternalServerErrorException({ message: `Product can't delete` });
      }
    }
  }
}
