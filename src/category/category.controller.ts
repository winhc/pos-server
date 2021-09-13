import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe, UseInterceptors, UploadedFile, Headers, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
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
  SERVER_URL:  string  =  "http://localhost:4000/";
  /**
   * create new category
   */
  @ApiCreatedResponse({ type: CategoryDto, description: 'Response cerated category' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @Req() req: any): Promise<CategoryDto> {
    const user = <UserDto>req.user; // TODO: in feature, add operation user in category table
    return await this.categoryService.create(user, createCategoryDto);
  }

  /**
   * upload image
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Headers() headers) {
    console.log('upload headers =>', headers);
    console.log('upload image file=>', file);
    return `${this.SERVER_URL}${file.path}`;
  }

  /**
   * find all category OR
   * search category by category_name 
   */
  @ApiOkResponse({ type: CategoryDto, isArray: true, description: 'Response all categories or search category by name' })
  @ApiQuery({ name: 'category_name', required: false })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get()
  async findAll(@Query('category_name') category_name?: string): Promise<CategoryDto[]> {
    return await this.categoryService.findAll(category_name);
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
