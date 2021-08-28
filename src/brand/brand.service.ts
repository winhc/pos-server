import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toBrandDto } from 'src/helper/mapper/brand.mapper';
import { Repository } from 'typeorm';
import { BrandDto } from './dto/brand.dto';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
const logger = new Logger('BrandService');

@Injectable()
export class BrandService {
  constructor(@InjectRepository(Brand) private readonly brandRepository: Repository<Brand> ){}

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
    return toBrandDto(brand);
  }

  /**
   * find brand data
   * return BrandDto[]
   */
  async findAll(brand_name?: string): Promise<BrandDto[]> {
    try {
      if (brand_name) {
        const brand = await this.brandRepository.find({ where: { brand_name } });
        return brand.map(category => toBrandDto(category));
      } else {
        const brand = await this.brandRepository.find();
        return brand.map(category => toBrandDto(category));
      }
    } catch (error) {
      logger.error(`findAll: ${error}`);
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
      return toBrandDto(brand)
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
      const brandToUpdate = Object.assign(brand, updateBrandDto);
      await this.brandRepository.update(id, brandToUpdate);
    } catch (error) {
      logger.error(`update : ${error}`);
      throw new InternalServerErrorException({ message: 'Update brand fail' })
    }
    const updateBrand = await this.findOne(brand.id);
    return toBrandDto(updateBrand);
  }

  /**
   * Delete entre brand row data that matches given id.
   * return BrandDto
   */
  async remove(id: number): Promise<BrandDto> {
    const brand = await this.findOne(id);
    if (!brand) {
      throw new BadRequestException({ message: 'Brand not found' });
    }
    const deleteBrand = await this.brandRepository.remove(brand);
    return toBrandDto(deleteBrand);
  }
}
