import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PurchaseOptionDto } from './dto/purchase-option.dto';
import { PurchaseDto } from './dto/purchase.dto';

@ApiTags('purchases')
@Controller('purchases')
@UseGuards(AuthGuard())
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) { }

  @ApiCreatedResponse({ type: PurchaseDto, description: 'Response cerated purchase' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Post()
  async create(@Body() createPurchaseDto: CreatePurchaseDto): Promise<PurchaseDto> {
    return await this.purchaseService.create(createPurchaseDto);
  }

  @ApiOkResponse({ type: PurchaseDto, isArray: false, description: 'Response all urchase or search purchase by supplier_name' })
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
    @Query('to_date') to_date?: string): Promise<PurchaseDto> {
    return await this.purchaseService.findAll(supplier_name, +page_size, +page_index, from_date, to_date);
  }

  @Get('purchase-options')
  async findPurchaseOption(): Promise<PurchaseOptionDto> {
    return await this.purchaseService.findPurchaseOptions();
  }

  @ApiOkResponse({ type: PurchaseDto, description: 'Response search purchase' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PurchaseDto> {
    return this.purchaseService.findById(id);
  }

  @ApiOkResponse({ type: PurchaseDto, description: 'Response updated purchase' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updatePurchaseDto: UpdatePurchaseDto): Promise<PurchaseDto> {
    return await this.purchaseService.update(id, updatePurchaseDto);
  }

  @ApiOkResponse({ type: PurchaseDto, description: 'Response deleted product' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<PurchaseDto> {
    return await this.purchaseService.remove(id);
  }
}
