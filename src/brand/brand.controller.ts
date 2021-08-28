import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BrandService } from './brand.service';
import { BrandDto } from './dto/brand.dto';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@ApiTags('brands')
@Controller('brands')
@UseGuards(AuthGuard())
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  /**
   * create new brand
   */
   @ApiCreatedResponse({ type: BrandDto, description: 'Response cerated brand' })
   @ApiNotFoundResponse()
   @ApiBadRequestResponse()
   @ApiInternalServerErrorResponse()
   @Post()
   async create(@Body() createBrandDto: CreateBrandDto): Promise<BrandDto> {
     return await this.brandService.create(createBrandDto);
   }
 
   /**
    * find all brand OR
    * search brand by brand_name
    */
   @ApiOkResponse({ type: BrandDto, isArray: true, description: 'Response all brands or search brand by brand_name' })
   @ApiQuery({ name: 'brand_name', required: false })
   @ApiNotFoundResponse()
   @ApiBadRequestResponse()
   @ApiInternalServerErrorResponse()
   @Get()
   async findAll(@Query('brand_name') brand_name?: string): Promise<BrandDto[]> {
     return await this.brandService.findAll(brand_name);
   }
 
   /**
    * get brand by id
    */
   @ApiOkResponse({ type: BrandDto, description: 'Response search brand' })
   @ApiNotFoundResponse()
   @ApiBadRequestResponse()
   @ApiInternalServerErrorResponse()
   @Get(':id')
   async findOne(@Param('id', ParseIntPipe) id: number): Promise<BrandDto> {
     return this.brandService.findOne(id);
   }
 
   /**
    * update brand by id
    */
   @ApiOkResponse({ type: BrandDto, description: 'Response updated brand' })
   @ApiNotFoundResponse()
   @ApiBadRequestResponse()
   @ApiInternalServerErrorResponse()
   @Patch(':id')
   async update(@Param('id', ParseIntPipe) id: number, @Body() updateBrandDto: UpdateBrandDto): Promise<BrandDto> {
     return await this.brandService.update(id, updateBrandDto);
   }
 
   /**
    * delete brand by id
    */
   @ApiOkResponse({ type: BrandDto, description: 'Response deleted brand' })
   @ApiNotFoundResponse()
   @ApiBadRequestResponse()
   @ApiInternalServerErrorResponse()
   @Delete(':id')
   async remove(@Param('id', ParseIntPipe) id: number): Promise<BrandDto> {
     return await this.brandService.remove(id);
   }
}
