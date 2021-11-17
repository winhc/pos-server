import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { OrderDto } from 'src/order/dto/order.dto';
import { ProductDto } from 'src/product/dto/product.dto';
import { SaleDto } from 'src/sale/dto/sale.dto';
import { ReportService } from './report.service';

@ApiTags('reports')
@Controller('reports')
@UseGuards(AuthGuard())
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @ApiOkResponse({ type: OrderDto, description: 'Response sale report' })
  @ApiQuery({ name: 'page_size', required: false })
  @ApiQuery({ name: 'page_index', required: false })
  @ApiQuery({ name: 'from_date', required: false })
  @ApiQuery({ name: 'to_date', required: false })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get('sale')
  async findSaleReport(
    @Query('page_size') page_size?: number,
    @Query('page_index') page_index?: number,
    @Query('from_date') from_date?: string,
    @Query('to_date') to_date?: string): Promise<OrderDto> {
    return await this.reportService.findSaleReport(+page_size, +page_index, from_date, to_date);
  }
}
