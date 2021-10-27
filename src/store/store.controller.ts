import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { StoreDto } from './dto/store.dto';

@ApiTags('stores')
@Controller('stores')
@UseGuards(AuthGuard())
export class StoreController {
  constructor(private readonly storeService: StoreService) { }

  /**
   * create new store
   */
  @ApiCreatedResponse({ type: StoreDto, description: 'Response cerated store' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Post()
  async create(@Body() createStoreDto: CreateStoreDto): Promise<StoreDto> {
    return await this.storeService.create(createStoreDto);
  }

  /**
   * find all store OR
   * search store by store_name
   */
  @ApiOkResponse({ type: StoreDto, description: 'Response all stores or search store by store_name' })
  @ApiQuery({ name: 'page_size', required: false })
  @ApiQuery({ name: 'page_index', required: false })
  @ApiQuery({ name: 'store_name', required: false })
  @ApiQuery({ name: 'from_date', required: false })
  @ApiQuery({ name: 'to_date', required: false })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get()
  async findAll(
    @Query('page_size') page_size?: number,
    @Query('page_index') page_index?: number,
    @Query('store_name') store_name?: string,
    @Query('from_date') from_date?: string,
    @Query('to_date') to_date?: string): Promise<StoreDto> {
    return await this.storeService.findAll(+page_size, +page_index, store_name, from_date, to_date);
  }

  /**
   * get store by id
   */
  @ApiOkResponse({ type: StoreDto, description: 'Response search store' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<StoreDto> {
    return this.storeService.findById(id);
  }

  /**
   * update store by id
   */
  @ApiOkResponse({ type: StoreDto, description: 'Response updated store' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateStoreDto: UpdateStoreDto): Promise<StoreDto> {
    return await this.storeService.update(id, updateStoreDto);
  }

  /**
   * delete store by id
   */
  @ApiOkResponse({ type: StoreDto, description: 'Response deleted store' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<StoreDto> {
    return await this.storeService.remove(id);
  }
}
