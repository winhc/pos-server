import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProductDto } from './dto/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductOptionDto } from './dto/product-option.dto';

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
  @UseInterceptors(FileInterceptor('image',
    {
      storage: diskStorage({
        destination: './avatars/product',
        filename: (req, file, callBack) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return callBack(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    }
  )
  )
  async create(@Body() createProductDto: CreateProductDto, @UploadedFile() file): Promise<ProductDto> {
    const image_name = file?.filename;
    console.log('createProductDto =>', createProductDto);
    return await this.productService.create(createProductDto, image_name);
  }

  /**
   * find all product OR
   * search product by product_name
   */
  @ApiOkResponse({ type: ProductDto, isArray: false, description: 'Response all product or search product by product_name' })
  @ApiQuery({ name: 'page_size', required: false })
  @ApiQuery({ name: 'page_index', required: false })
  @ApiQuery({ name: 'product_name', required: false })
  @ApiQuery({ name: 'from_date', required: false })
  @ApiQuery({ name: 'to_date', required: false })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get()
  async findAll(
    @Query('page_size') page_size?: number,
    @Query('page_index') page_index?: number,
    @Query('product_name') product_name?: string,
    @Query('from_date') from_date?: string,
    @Query('to_date') to_date?: string): Promise<ProductDto> {
    return await this.productService.findAll(product_name, +page_size, +page_index, from_date, to_date);
  }

  /**
   * find all product options
   */
  @ApiOkResponse({ type: ProductOptionDto, description: 'Response all product options' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get('product-options')
  async findProductOption(): Promise<ProductOptionDto> {
    return await this.productService.findProductOption();
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
    return this.productService.findById(id);
  }

  /**
   * update product by id
   */
  @ApiOkResponse({ type: ProductDto, description: 'Response updated product' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image',
    {
      storage: diskStorage({
        destination: './avatars/product',
        filename: (req, file, callBack) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return callBack(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    }
  )
  )
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto, @UploadedFile() file): Promise<ProductDto> {
    const image_name = file?.filename || updateProductDto.image;
    console.log('upload image file =>', file);
    console.log('updateProductDto =>', updateProductDto);
    return await this.productService.update(id, updateProductDto,image_name);
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
