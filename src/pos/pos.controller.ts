import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProductDto } from 'src/product/dto/product.dto';
import { POSOptionDto } from './dto/pos-option.dto';
import { PosService } from './pos.service';

@ApiTags('pos')
@Controller('pos')
@UseGuards(AuthGuard())
export class PosController {
  constructor(private readonly posService: PosService) { }

  /**
   * find pos option
   */
  @ApiOkResponse({ type: POSOptionDto, description: 'Response pos options' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get()
  async findPOSOption(): Promise<POSOptionDto> {
    return await this.posService.findPOSOption();
  }

  /**
   * find product for shop
   */
  @ApiOkResponse({ type: ProductDto, isArray: false, description: 'Response product for shop' })
  @ApiQuery({ name: 'category_id', required: false })
  @ApiQuery({ name: 'product_name', required: false })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get('products')
  async findProductShop(
    @Query('category_id') category_id?: number,
    @Query('product_name') product_name?: string): Promise<ProductDto> {
    return await this.posService.findProductShop(+category_id, product_name);
  }
}
