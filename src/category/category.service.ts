import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toCategoryDto } from 'src/helper/category.mapper';
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

  async create({ account }: UserDto, createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    const { name, remarks } = createCategoryDto;
    const user = this.userService.findAccount({ where: {account} });
    logger.log(`user: ${user}`);
    const category: Category = this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.save(category);
    return toCategoryDto(category);
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
