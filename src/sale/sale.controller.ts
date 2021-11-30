import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SaleDto } from './dto/sale.dto';

@ApiTags('sales')
@Controller('sales')
@UseGuards(AuthGuard())
export class SaleController {
  constructor(private readonly saleService: SaleService) { }

  /**
   * create new sale
   */
  @ApiCreatedResponse({ type: SaleDto, description: 'Response cerated sale' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Post()
  async create(@Body() createSaleDto: CreateSaleDto): Promise<SaleDto> {
    return this.saleService.create(createSaleDto);
  }

  /**
   * find all sale OR
   * search sale by order_code
   */
  @ApiOkResponse({ type: SaleDto, isArray: false, description: 'Response all sale or search sale by order_code' })
  @ApiQuery({ name: 'page_size', required: false })
  @ApiQuery({ name: 'page_index', required: false })
  @ApiQuery({ name: 'order_code', required: false })
  @ApiQuery({ name: 'from_date', required: false })
  @ApiQuery({ name: 'to_date', required: false })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get()
  async findAll(
    @Query('page_size') page_size?: number,
    @Query('page_index') page_index?: number,
    @Query('sale_code') order_code?: string,
    @Query('from_date') from_date?: string,
    @Query('to_date') to_date?: string): Promise<SaleDto> {
    return await this.saleService.findAll(order_code, +page_size, +page_index, from_date, to_date);
  }

  /**
   * get sale by id
   */
  @ApiOkResponse({ type: SaleDto, description: 'Response search sale' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<SaleDto> {
    return await this.saleService.findById(id);
  }

  /**
   * update sale by id
   */
  @ApiOkResponse({ type: SaleDto, description: 'Response updated sale' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateSaleDto: UpdateSaleDto): Promise<SaleDto> {
    return await this.saleService.update(id, updateSaleDto);
  }

  /**
   * delete sale by id
   */
  @ApiOkResponse({ type: SaleDto, description: 'Response deleted sale' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<SaleDto> {
    return this.saleService.remove(id);
  }
}
