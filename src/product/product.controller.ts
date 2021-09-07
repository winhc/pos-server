import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProductDto } from './dto/product.dto';

@ApiTags('products')
@Controller('products')
@UseGuards(AuthGuard())
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  /**
   * create new product
   */
  @ApiCreatedResponse({ type: ProductDto, description: 'Response cerated product' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<ProductDto> {
    return await this.productService.create(createProductDto);
  }

  /**
   * find all product OR
   * search product by product_name
   */
  @ApiOkResponse({ type: ProductDto, isArray: true, description: 'Response all product or search product by product_name' })
  @ApiQuery({ name: 'product_name', required: false })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get()
  async findAll(@Query('product_name') product_name?: string): Promise<ProductDto[]> {
    return await this.productService.findAll(product_name);
  }

  /**
   * get product by id
   */
  @ApiOkResponse({ type: ProductDto, description: 'Response search product' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductDto> {
    return this.productService.findOne(id);
  }

  /**
   * update product by id
   */
  @ApiOkResponse({ type: ProductDto, description: 'Response updated product' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto): Promise<ProductDto> {
    return await this.productService.update(id, updateProductDto);
  }

  /**
   * delete product by id
   */
  @ApiOkResponse({ type: ProductDto, description: 'Response deleted product type' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ProductDto> {
    return await this.productService.remove(id);
  }
}
