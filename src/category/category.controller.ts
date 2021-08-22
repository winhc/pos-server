import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user.dto';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('categories')
@Controller('categories')
@UseGuards(AuthGuard())
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }
  /**
   * create new category
   */
  @ApiCreatedResponse({ type: CategoryDto, description: 'Response cerated user' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @Req() req: any): Promise<CategoryDto> {
    const user = <UserDto>req.user; // TODO: in feature, add operation user in category table
    return await this.categoryService.create(user, createCategoryDto);
  }

  /**
   * find all category OR
   * search category by name 
   */
  @ApiOkResponse({ type: CategoryDto, isArray: true, description: 'Response all categories or search category by name' })
  @ApiQuery({ name: 'name', required: false })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get()
  async findAll(@Query('name') name?: string): Promise<CategoryDto[]> {
    return await this.categoryService.findAll(name);
  }

  /**
   * get category by id
   */
  @ApiOkResponse({ type: CategoryDto, description: 'Response search category' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<CategoryDto> {
    return this.categoryService.findOne(id);
  }

  /**
   * update category by id
   */
  @ApiOkResponse({ type: CategoryDto, description: 'Response updated category' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto): Promise<CategoryDto> {
    return await this.categoryService.update(id, updateCategoryDto);
  }

  /**
   * delete category by id
   */
  @ApiOkResponse({ type: CategoryDto, description: 'Response deleted category' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<CategoryDto> {
    return await this.categoryService.remove(id);
  }
}
