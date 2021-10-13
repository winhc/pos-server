import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProductTypeDto } from './dto/product-type.dto';

@ApiTags('product-types')
@Controller('product-types')
@UseGuards(AuthGuard())
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) { }

  /**
   * create new product type
   */
  @ApiCreatedResponse({ type: ProductTypeDto, description: 'Response cerated product type' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Post()
  async create(@Body() createProductTypeDto: CreateProductTypeDto): Promise<ProductTypeDto> {
    return await this.productTypeService.create(createProductTypeDto);
  }

  /**
   * find all product type OR
   * search product type by product_type_name
   */
  @ApiOkResponse({ type: ProductTypeDto, isArray: false, description: 'Response all product type or search product type by product_type_name' })
  @ApiQuery({ name: 'page_size', required: true })
  @ApiQuery({ name: 'page_index', required: true })
  @ApiQuery({ name: 'product_type_name', required: false })
  @ApiQuery({ name: 'from_date', required: false })
  @ApiQuery({ name: 'to_date', required: false })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get()
  async findAll(
    @Query('page_size', ParseIntPipe) page_size: number,
    @Query('page_index', ParseIntPipe) page_index: number,
    @Query('product_type_name') product_type_name?: string,
    @Query('from_date') from_date?: string,
    @Query('to_date') to_date?: string): Promise<ProductTypeDto> {
    return await this.productTypeService.findAll(page_size, page_index, product_type_name, from_date, to_date);
  }

  /**
   * get product type by id
   */
  @ApiOkResponse({ type: ProductTypeDto, description: 'Response search product type' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductTypeDto> {
    return this.productTypeService.findById(id);
  }

  /**
   * update product type by id
   */
  @ApiOkResponse({ type: ProductTypeDto, description: 'Response updated product type' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductTypeDto: UpdateProductTypeDto): Promise<ProductTypeDto> {
    return await this.productTypeService.update(id, updateProductTypeDto);
  }

  /**
   * delete product type by id
   */
  @ApiOkResponse({ type: ProductTypeDto, description: 'Response deleted product type' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ProductTypeDto> {
    return await this.productTypeService.remove(id);
  }
}
