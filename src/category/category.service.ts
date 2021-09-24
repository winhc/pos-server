import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toCategoryDto } from 'src/helper/mapper/category.mapper';
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
  async create({ account }: UserDto, createCategoryDto: CreateCategoryDto, image_name?: string): Promise<CategoryDto> {
    createCategoryDto.image = image_name;
    const { category_name } = createCategoryDto;
    // const user = this.userService.findAccount({ where: {account} });
    // logger.log(`user: ${user}`);
    const categoryInDb = await this.categoryRepository.findOne({ where: { category_name } });
    if (categoryInDb) {
      throw new BadRequestException({ message: 'Category already exit' });
    }
    const category: Category = this.categoryRepository.create(createCategoryDto);
    try {
      await this.categoryRepository.save(category);
    } catch (error) {
      logger.error(`create: ${error}`);
      throw new InternalServerErrorException({ message: 'Create category fail' });
    }
    return toCategoryDto(category);
  }

  /**
   * find category data
   * return CategoryDto[]
   */
  async findAll(category_name?: string): Promise<CategoryDto[]> {
    try {
      if (category_name) {
        const category = await this.categoryRepository.find({ where: { category_name } });
        return category.map(data => toCategoryDto(data));
      } else {
        const category = await this.categoryRepository.find();
        return category.map(data => toCategoryDto(data));
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
      return toCategoryDto(category)
    } catch (error) {
      throw new BadRequestException({ message: 'Category not found' });
    }
  }

  /**
   * Update category row data that matches given id
   * return CategoryDto
   */
  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<CategoryDto> {
    const category = await this.findOne(id);
    if (!category) {
      throw new BadRequestException({ message: 'Category not found' });
    }
    try {
      const categoryToUpdate = Object.assign(category, updateCategoryDto);
      await this.categoryRepository.update(id, categoryToUpdate);
    } catch (error) {
      logger.error(`update : ${error}`);
      throw new InternalServerErrorException({ message: 'Update fail' })
    }
    const updateCategory = await this.findOne(category.id);
    return toCategoryDto(updateCategory);
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
    return toCategoryDto(deleteCategory);
  }
}
