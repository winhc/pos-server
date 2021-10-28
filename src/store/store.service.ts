import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toStoreDto, toStoreModel } from 'src/helper/mapper/store.mapper';
import { formattedDate } from 'src/helper/utils';
import { Product } from 'src/product/entities/product.entity';
import { Like, Repository } from 'typeorm';
import { CreateStoreProductDto } from './dto/create-store-product.dto';
import { CreateStoreDto } from './dto/create-store.dto';
import { StoreDto } from './dto/store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { StoreProduct } from './entities/store-product.entity';
import { Store } from './entities/store.entity';
const logger = new Logger('StoreService')

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store) private readonly storeRepository: Repository<Store>,
    @InjectRepository(StoreProduct) private readonly storeProductRepository: Repository<StoreProduct>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ) { }
  /**
   * create new store data
   * return StoreDto
   */
  async create(createStoreDto: CreateStoreDto): Promise<StoreDto> {
    const { store_name } = createStoreDto;

    const brandInDb = await this.storeRepository.findOne({ where: { store_name } });
    if (brandInDb) {
      throw new BadRequestException({ message: 'Store already exit' });
    }
    const store: Store = this.storeRepository.create(createStoreDto);
    try {
      await this.storeRepository.save(store);
    } catch (error) {
      logger.error(`create: ${error}`);
      throw new InternalServerErrorException({ message: 'Create store fail' });
    }
    const data = toStoreModel(store);
    return toStoreDto(data);
  }

  /**
   * create new store data
   * return StoreProduct entity
   */
  async createStoreProduct(createStoreProductDto: CreateStoreProductDto): Promise<StoreProduct> {

    const storeProduct: StoreProduct = this.storeProductRepository.create(createStoreProductDto);
    try {
      await this.storeProductRepository.save(storeProduct);
    } catch (error) {
      logger.error(`create: ${error}`);
      throw new InternalServerErrorException({ message: `Create store's product fail` });
    }
    return storeProduct;
  }

  /**
   * find store data
   * return StoreDto
   */
  async findAll(page_size?: number, page_index?: number, store_name?: string, from_date?: string, to_date?: string): Promise<StoreDto> {
    logger.log(`page_size: ${page_size}, page_index: ${page_index}, store_name: ${store_name}, from_date: ${from_date}, to_date: ${to_date}`)
    try {
      const productQb = await this.storeRepository.createQueryBuilder('store')
        .select('store.id');

      // Option 1
      if (store_name && from_date && to_date && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [store, count] = await this.storeRepository.createQueryBuilder('store')
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('store.store_products', 'store_products')
          .leftJoinAndSelect('store_products.product', 'product')
          .leftJoinAndSelect('store_products.product_type', 'product_type')
          .where('DATE(store.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
          .andWhere('store.store_name LIKE :s_name', { s_name: `%${store_name}%` })
          .andWhere('store_products.id IN (' + productQb.getQuery() + ')')
          .orderBy('store.id')
          .getManyAndCount()
        const data = store.map(value => toStoreModel(value));
        return toStoreDto(data, count);
      }
      // Option 2
      else if (from_date && to_date && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [store, count] = await this.storeRepository.createQueryBuilder('store')
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('store.store_products', 'store_products')
          .leftJoinAndSelect('store_products.product', 'product')
          .leftJoinAndSelect('store_products.product_type', 'product_type')
          .where('DATE(store.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
          .andWhere('store_products.id IN (' + productQb.getQuery() + ')')
          .orderBy('store.id')
          .getManyAndCount()
        const data = store.map(value => toStoreModel(value));
        return toStoreDto(data, count);
      }
      // Option 3
      else if (store_name && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [store, count] = await this.storeRepository.createQueryBuilder('store')
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('store.store_products', 'store_products')
          .leftJoinAndSelect('store_products.product', 'product')
          .leftJoinAndSelect('store_products.product_type', 'product_type')
          .where('store.store_name LIKE :s_name', { s_name: `%${store_name}%` })
          .andWhere('store_products.id IN (' + productQb.getQuery() + ')')
          .orderBy('store.id')
          .getManyAndCount()
        const data = store.map(value => toStoreModel(value));
        return toStoreDto(data, count)
      }
      // Option 4
      else if (page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [store, count] = await this.storeRepository.createQueryBuilder('store')
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('store.store_products', 'store_products')
          .leftJoinAndSelect('store_products.product', 'product')
          .leftJoinAndSelect('store_products.product_type', 'product_type')
          .andWhere('store_products.id IN (' + productQb.getQuery() + ')')
          .orderBy('store.id')
          .getManyAndCount()
        const data = store.map(value => toStoreModel(value));
        return toStoreDto(data, count)
      }
      // Option 5
      else {
        const [store, count] = await this.storeRepository.createQueryBuilder('store')
          .leftJoinAndSelect('store.store_products', 'store_products')
          .leftJoinAndSelect('store_products.product', 'product')
          .leftJoinAndSelect('store_products.product_type', 'product_type')
          .where('store_products.id IN (' + productQb.getQuery() + ')')
          .orderBy('store.id')
          .getManyAndCount()
        const data = store.map(value => toStoreModel(value));
        return toStoreDto(data, count);
      }
    } catch (error) {
      logger.error(`findAll: ${error}`);
      throw new BadRequestException({ message: 'Store not found' });
    }
  }

  /**
   * find store data and count
   * return StoreDto
   * not select relation
   */
  async find(): Promise<StoreDto> {
    try {
      const [supplier, count] = await this.storeRepository.findAndCount();
      const data = supplier.map(value => toStoreModel(value));
      return toStoreDto(data, count);
    } catch (error) {
      logger.error(`find: ${error}`);
      throw new BadRequestException({ message: 'Store not found' });
    }
  }

  /**
   * find store data by id
   * return Store Entity
   */
  async findOne(id: number): Promise<Store> {
    try {
      return await this.storeRepository.findOneOrFail(id);
    } catch (error) {
      logger.warn(`findOne : ${error}`);
      throw new BadRequestException({ message: 'Store not found' });
    }
  }

  /**
   * find store data by id
   * return StoreDto
   */
  async findById(id: number): Promise<StoreDto> {
    try {
      const store = await this.findOne(id);
      const data = toStoreModel(store);
      return toStoreDto(data)
    } catch (error) {
      throw new BadRequestException({ message: 'Store not found' });
    }
  }

  /**
   * Update store row data that matches given id
   * return StoreDto
   */
  async update(id: number, updateStoreDto: UpdateStoreDto): Promise<StoreDto> {
    const store = await this.findOne(id);
    if (!store) {
      throw new BadRequestException({ message: 'Store not found' });
    }
    try {
      updateStoreDto.updated_at = new Date();
      const brandToUpdate = Object.assign(store, updateStoreDto);
      await this.storeRepository.update(id, brandToUpdate);
    } catch (error) {
      logger.error(`update : ${error}`);
      throw new InternalServerErrorException({ message: 'Update store fail' })
    }
    const updateBrand = await this.findOne(store.id);
    const data = toStoreModel(updateBrand);
    return toStoreDto(data)
  }

  /**
   * Delete entre store row data that matches given id.
   * return StoreDto
   */
  async remove(id: number): Promise<StoreDto> {
    const store = await this.storeRepository.findOne(id);
    if (!store) {
      throw new BadRequestException({ message: 'Store not found' });
    }
    const deleteBrand = await this.storeRepository.remove(store);
    const data = toStoreModel(deleteBrand);
    return toStoreDto(data)
  }
}
