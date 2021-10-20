import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toCategoryModel, toCategoryDto } from 'src/helper/mapper/category.mapper';
import { UserModel } from 'src/helper/model/user.model';
import { formattedDate } from 'src/helper/utils';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
const logger = new Logger('CategoryService');

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    private readonly userService: UserService) { }

  /**
   * create new category data
   * return CategoryDto
   */
  async create({ account }: UserModel, createCategoryDto: CreateCategoryDto, image_name?: string): Promise<CategoryDto> {
    createCategoryDto.image = image_name;
    const { category_name, category_code } = createCategoryDto;
    // const user = this.userService.findAccount({ where: {account} });
    // logger.log(`user: ${user}`);
    const categoryNameInDb = await this.categoryRepository.findOne({ where: { category_name } });
    if (categoryNameInDb) {
      throw new BadRequestException({ message: 'Category name already exit' });
    }
    const categoryCodeInDb = await this.categoryRepository.findOne({ where: { category_code } });
    if (categoryCodeInDb) {
      throw new BadRequestException({ message: 'Category code already exit' });
    }
    const category: Category = this.categoryRepository.create(createCategoryDto);
    try {
      await this.categoryRepository.save(category);
    } catch (error) {
      logger.error(`create: ${error}`);
      throw new InternalServerErrorException({ message: 'Create category fail' });
    }
    const data = toCategoryModel(category);
    return toCategoryDto(data);
  }

  /**
   * find category data
   * return CategoryDto
   */
  async findAll(page_size?: number, page_index?: number, category_name?: string, from_date?: string, to_date?: string): Promise<CategoryDto> {
    logger.log(`page_size: ${page_size}, page_index: ${page_index}, category_name: ${category_name}, from_date: ${from_date}, to_date: ${to_date}`)
    try {
      if (category_name && from_date && to_date && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;
        const category = await this.categoryRepository.createQueryBuilder('category')
          .select('*')
          .addSelect('COUNT(*) OVER () AS count')
          .where('DATE(category.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
          .andWhere('category.category_name LIKE :c_name', { c_name: `%${category_name}%` })
          .skip(fromIndex)
          .take(takeLimit)
          .orderBy('category.id')
          .getRawMany();
        // logger.log(`category => ${category}`);
        const data = category.map(value => toCategoryModel(value));
        // logger.log(`data => ${data}, count => ${category[0]?.count}`);
        const count = parseInt(category[0]?.count);
        return toCategoryDto(data, count);
      }
      else if (from_date && to_date && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;
        const category = await this.categoryRepository.createQueryBuilder('category')
          .select('*')
          .addSelect('COUNT(*) OVER () AS count')
          .where('DATE(category.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
          .skip(fromIndex)
          .take(takeLimit)
          .orderBy('category.id')
          .getRawMany();

        // logger.log(`category => ${category}`);
        const data = category.map(value => toCategoryModel(value));
        // logger.log(`data => ${data}, count => ${category[0]?.count}`);
        const count = parseInt(category[0]?.count);
        return toCategoryDto(data, count);

      }
      else if (category_name && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;
        const category = await this.categoryRepository.createQueryBuilder('category')
          .select('*')
          .addSelect('COUNT(*) OVER () AS count')
          .where('category.category_name LIKE :c_name', { c_name: `%${category_name}%` })
          .skip(fromIndex)
          .take(takeLimit)
          .orderBy('category.id')
          .getRawMany();
        // logger.log(`category => ${category}`);
        const data = category.map(value => toCategoryModel(value));
        // logger.log(`data => ${data}, count => ${category[0]?.count}`);
        const count = parseInt(category[0]?.count);
        return toCategoryDto(data, count);
      }
      else if(page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;
        const [category, count] = await this.categoryRepository.findAndCount({ skip: fromIndex, take: takeLimit });
        // logger.log(`data => ${category}`)
        // logger.log(`total_count => ${count}`)
        const data = category.map(value => toCategoryModel(value));
        return toCategoryDto(data, count);
      } else {
        const [category, count] = await this.categoryRepository.findAndCount();
        const data = category.map(value => toCategoryModel(value));
        return toCategoryDto(data, count);
      }
    } catch (error) {
      logger.error(`findAll: ${error}`);
      throw new BadRequestException({ message: 'Category not found' });
    }
  }

  /**
   * find category data by id
   * return Category Entity
   */
  async findOne(id: number): Promise<Category> {
    try {
      return await this.categoryRepository.findOneOrFail(id);
    } catch (error) {
      logger.warn(`findOne : ${error}`);
      throw new BadRequestException({ message: 'Category not found' });
    }
  }

  /**
   * find category data by id
   * return CategoryDto
   */
  async findById(id: number): Promise<CategoryDto> {
    try {
      const category = await this.findOne(id);
      const data = toCategoryModel(category);
      return toCategoryDto(data);
    } catch (error) {
      throw new BadRequestException({ message: 'Category not found' });
    }
  }

  /**
   * find image
   */

  async findImage(id: number, image: string): Promise<CategoryDto> {
    try {
      const categoryInDb = await this.findOne(id);
      if (!categoryInDb) {
        throw new BadRequestException({ message: 'Category not found' });
      } else {
        const category = await this.categoryRepository.findOne({ where: { image } });
        const data = toCategoryModel(category);
        return toCategoryDto(data);
      }
    } catch (error) {
      throw new BadRequestException({ message: 'Category not found' });
    }
  }

  /**
   * Update category row data that matches given id
   * return CategoryDto
   */
  async update(id: number, updateCategoryDto: UpdateCategoryDto, image_name?: string): Promise<CategoryDto> {
    const category = await this.findOne(id);
    if (!category) {
      throw new BadRequestException({ message: 'Category not found' });
    }
    try {
      // if(typeof image_name != 'undefined'){
      //   updateCategoryDto.image = image_name;
      // }else{
      //   updateCategoryDto.image = null;
      // }
      updateCategoryDto.image = image_name;
      updateCategoryDto.updated_at = new Date();

      // logger.log(`image => ${updateCategoryDto.image} type ${typeof image_name}`)
      const categoryToUpdate = Object.assign(category, updateCategoryDto);
      await this.categoryRepository.update(id, categoryToUpdate);
    } catch (error) {
      logger.error(`update : ${error}`);
      throw new InternalServerErrorException({ message: 'Update fail' })
    }
    const updateCategory = await this.findOne(category.id);
    const data = toCategoryModel(updateCategory);
    return toCategoryDto(data);
  }

  /**
   * Delete entre category row data that matches given id.
   */
  async remove(id: number): Promise<CategoryDto> {
    const category = await this.findOne(id);
    if (!category) {
      throw new BadRequestException({ message: 'Category not found' });
    }
    const deleteCategory = await this.categoryRepository.remove(category);
    const data = toCategoryModel(deleteCategory);
    return toCategoryDto(data);
  }
}
