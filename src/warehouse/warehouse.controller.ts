import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SupplierProduct } from 'src/supplier/entities/supplier-product.entity';
import { ImportProductOptionDto } from './dto/import-product-option.dto';
import { ExportProductOptionDto } from './dto/export-product-option.dto';
import { ProductDto } from 'src/product/dto/product.dto';
import { ImportProductDto } from './dto/import-product.dto';
import { ExportProductDto } from './dto/export-product.dto';

@ApiTags('warehouses')
@Controller('warehouses')
@UseGuards(AuthGuard())
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) { }

  // @Post()
  // create(@Body() createWarehouseDto: CreateWarehouseDto) {
  //   return this.warehouseService.create(createWarehouseDto);
  // }

  @Get()
  async findAll(): Promise<SupplierProduct[]> {
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
   @ApiOkResponse({ type: ProductDto, description: 'Response import product' })
   @ApiNotFoundResponse()
   @ApiBadRequestResponse()
   @ApiInternalServerErrorResponse()
  @Patch('import/:id')
  async importProduct(@Param('id', ParseIntPipe) id: number, @Body() importProductDto: ImportProductDto): Promise<ProductDto> {
    return await this.warehouseService.importProduct(id, importProductDto);
  }

  /**
   * export product
   */
   @ApiOkResponse({ type: ProductDto, description: 'Response export product' })
   @ApiNotFoundResponse()
   @ApiBadRequestResponse()
   @ApiInternalServerErrorResponse()
   @Patch('export/:id')
   async exportProduct(@Param('id', ParseIntPipe) id: number, @Body() exportProductDto: ExportProductDto): Promise<ProductDto> {
     return await this.warehouseService.exportProduct(id, exportProductDto);
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
