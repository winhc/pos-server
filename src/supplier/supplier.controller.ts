import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SupplierDto } from './dto/supplier.dto';

@ApiTags('suppliers')
@Controller('suppliers')
@UseGuards(AuthGuard())
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) { }

  /**
   * create new supplier
   */
  @ApiCreatedResponse({ type: SupplierDto, description: 'Response cerated supplier' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Post()
  async create(@Body() createSupplierDto: CreateSupplierDto): Promise<SupplierDto> {
    return await this.supplierService.create(createSupplierDto);
  }

  /**
   * find all supplier OR
   * search supplier by supplier_name 
   */
  @ApiOkResponse({ type: SupplierDto, description: 'Response all customers or search supplier by supplier_name' })
  @ApiQuery({ name: 'page_size', required: false })
  @ApiQuery({ name: 'page_index', required: false })
  @ApiQuery({ name: 'supplier_name', required: false })
  @ApiQuery({ name: 'from_date', required: false })
  @ApiQuery({ name: 'to_date', required: false })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get()
  async findAll(
    @Query('page_size') page_size?: number,
    @Query('page_index') page_index?: number,
    @Query('supplier_name') supplier_name?: string,
    @Query('from_date') from_date?: string,
    @Query('to_date') to_date?: string): Promise<SupplierDto> {
    return await this.supplierService.findAll(+page_size, +page_index, supplier_name, from_date, to_date);
  }

  /**
   * get supplier by id
   */
  @ApiOkResponse({ type: SupplierDto, description: 'Response search supplier' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<SupplierDto> {
    return this.supplierService.findById(id);
  }

  /**
   * update supplier by id
   */
  @ApiOkResponse({ type: SupplierDto, description: 'Response updated supplier' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateSupplierDto: UpdateSupplierDto): Promise<SupplierDto> {
    return await this.supplierService.update(id, updateSupplierDto);
  }

  /**
   * delete supplier by id
   */
  @ApiOkResponse({ type: SupplierDto, description: 'Response deleted supplier' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<SupplierDto> {
    return await this.supplierService.remove(id);
  }
}
