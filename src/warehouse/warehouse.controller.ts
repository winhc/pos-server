import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ImportProductOptionDto } from './dto/import-product-option.dto';
import { ExportProductOptionDto } from './dto/export-product-option.dto';
import { SupplierProductDto } from 'src/supplier/dto/supplier-product.dto';
import { CreateSupplierProductDto } from 'src/supplier/dto/create-supplier-product.dto';
import { StoreProductDto } from 'src/store/dto/store-product.dto';
import { CreateStoreProductDto } from 'src/store/dto/create-store-product.dto';

@ApiTags('warehouses')
@Controller('warehouses')
@UseGuards(AuthGuard())
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) { }

  // @Post()
  // create(@Body() createWarehouseDto: CreateWarehouseDto) {
  //   return this.warehouseService.create(createWarehouseDto);
  // }

  /**
   * find all product OR
   * search product by product_name
   */
  @ApiOkResponse({ type: SupplierProductDto, description: 'Response all product or search product by product_name' })
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
    @Query('to_date') to_date?: string): Promise<SupplierProductDto> {
    return this.warehouseService.findAll();
  }

  @Get('import-options')
  async findImportOPtion(): Promise<ImportProductOptionDto> {
    return this.warehouseService.findImportProductOption();
  }

  @Get('export-options')
  async findExportOption(): Promise<ExportProductOptionDto> {
    return this.warehouseService.findExportProductOption();
  }

  /**
   * import product to warehouse
   */
  @ApiOkResponse({ type: SupplierProductDto, description: 'Response import product' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Post('import-product')
  async importProduct(@Body() createSupplierProductDto: CreateSupplierProductDto): Promise<SupplierProductDto> {
    return await this.warehouseService.importProduct(createSupplierProductDto);
  }

  /**
   * export product
   */
  @ApiOkResponse({ type: StoreProductDto, description: 'Response export product' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Post('export-product')
  async exportProduct(@Body() createStoreProductDto: CreateStoreProductDto): Promise<StoreProductDto> {
    return await this.warehouseService.exportProduct(createStoreProductDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.warehouseService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateWarehouseDto: UpdateWarehouseDto) {
  //   return this.warehouseService.update(+id, updateWarehouseDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.warehouseService.remove(+id);
  }
}
