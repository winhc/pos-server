import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toBrandDto, toBrandModel } from 'src/helper/mapper/brand.mapper';
import { formattedDate } from 'src/helper/utils';
import { Like, Repository } from 'typeorm';
import { BrandDto } from './dto/brand.dto';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
const logger = new Logger('BrandService');

@Injectable()
export class BrandService {
  constructor(@InjectRepository(Brand) private readonly brandRepository: Repository<Brand>) { }

  /**
   * create new brand data
   * return BrandDto
   */
  async create(createBrandDto: CreateBrandDto): Promise<BrandDto> {
    const { brand_name } = createBrandDto;

    const brandInDb = await this.brandRepository.findOne({ where: { brand_name } });
    if (brandInDb) {
      throw new BadRequestException({ message: 'Brand already exit' });
    }
    const brand: Brand = this.brandRepository.create(createBrandDto);
    try {
      await this.brandRepository.save(brand);
    } catch (error) {
      logger.error(`create: ${error}`);
      throw new InternalServerErrorException({ message: 'Create brand fail' });
    }
    const data = toBrandModel(brand);
    return toBrandDto(data);
  }

  /**
   * find brand data
   * return BrandDto
   */
  async findAll(page_size?: number, page_index?: number, brand_name?: string, from_date?: string, to_date?: string): Promise<BrandDto> {
    logger.log(`page_size: ${page_size}, page_index: ${page_index}, brand_name: ${brand_name}, from_date: ${from_date}, to_date: ${to_date}`)
    try {
      // Option 1
      if (brand_name && from_date && to_date && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [brand, count] = await this.brandRepository.createQueryBuilder('brand')
          .where('DATE(brand.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
          .andWhere('brand.brand_name LIKE :b_name', { b_name: `%${brand_name}%` })
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('brand.products', 'products')
          .orderBy('brand.id')
          .getManyAndCount()

        logger.log(`brand => ${brand}, count => ${count}`);
        const data = brand.map(value => toBrandModel(value));
        return toBrandDto(data, count);
      }
      // Option 2
      else if (from_date && to_date && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [brand, count] = await this.brandRepository.createQueryBuilder('brand')
          .where('DATE(brand.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('brand.products', 'products')
          .orderBy('brand.id')
          .getManyAndCount()

        logger.log(`brand => ${brand}, count => ${count}`);
        const data = brand.map(value => toBrandModel(value));
        return toBrandDto(data, count);
      }
      // Option 3
      else if (brand_name && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [brand, count] = await this.brandRepository.findAndCount({
          relations: ['products'],
          skip: fromIndex,
          take: takeLimit,
          where: { brand_name: Like(`%${brand_name}%`) }
        });
        logger.log(`brand => ${brand}, count: ${count}`);
        const data = brand.map(value => toBrandModel(value));
        return toBrandDto(data, count)
      }
      // Option 4
      else if (page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [brand, count] = await this.brandRepository.findAndCount({
          relations: ['products'],
          skip: fromIndex,
          take: takeLimit
        });
        logger.log(`brand => ${brand}, count: ${count}`);
        const data = brand.map(value => toBrandModel(value));
        return toBrandDto(data, count)
      }
      // Option 5
      else {
        const [brand, count] = await this.brandRepository.findAndCount({
          relations: ['products'],
        });
        const data = brand.map(value => toBrandModel(value));
        return toBrandDto(data, count);
      }
    } catch (error) {
      logger.error(`findAll: ${error}`);
      throw new BadRequestException({ message: 'Brand not found' });
    }
  }

  /**
   * find brand data
   * return BrandDto
   * not select relation
   */
  async find(): Promise<BrandDto> {
    try {
      const [supplier, count] = await this.brandRepository.findAndCount();
      const data = supplier.map(value => toBrandModel(value));
      return toBrandDto(data, count);
    } catch (error) {
      logger.error(`find: ${error}`);
      throw new BadRequestException({ message: 'Brand not found' });
    }
  }

  /**
   * find brand data by id
   * return Brand Entity
   */
  async findOne(id: number): Promise<Brand> {
    try {
      return await this.brandRepository.findOneOrFail(id);
    } catch (error) {
      logger.warn(`findOne : ${error}`);
      throw new BadRequestException({ message: 'Brand not found' });
    }
  }

  /**
   * find brand data by id
   * return BrandDto
   */
  async findById(id: number): Promise<BrandDto> {
    try {
      const brand = await this.findOne(id);
      const data = toBrandModel(brand);
      return toBrandDto(data)
    } catch (error) {
      throw new BadRequestException({ message: 'Brand not found' });
    }
  }

  /**
   * Update brand row data that matches given id
   * return BrandDto
   */
  async update(id: number, updateBrandDto: UpdateBrandDto): Promise<BrandDto> {
    const brand = await this.findOne(id);
    if (!brand) {
      throw new BadRequestException({ message: 'Brand not found' });
    }
    try {
      updateBrandDto.updated_at = new Date();
      const brandToUpdate = Object.assign(brand, updateBrandDto);
      await this.brandRepository.update(id, brandToUpdate);
    } catch (error) {
      logger.error(`update : ${error}`);
      throw new InternalServerErrorException({ message: 'Update brand fail' })
    }
    const updateBrand = await this.findOne(brand.id);
    const data = toBrandModel(updateBrand);
    return toBrandDto(data)
  }

  /**
   * Delete entre brand row data that matches given id.
   * return BrandDto
   */
  async remove(id: number): Promise<BrandDto> {
    const brand = await this.brandRepository.findOne({ where: { id }, relations: ['products'] });
    if (!brand) {
      throw new BadRequestException({ message: 'Brand not found' });
    }
    if (brand.products.length > 0) {
      throw new BadRequestException({ message: `Can't delete this brand. This brand have related products. If you want to delete this brand, first delete related products.` });
    }
    const deleteBrand = await this.brandRepository.remove(brand);
    const data = toBrandModel(deleteBrand);
    return toBrandDto(data)
  }
}
