import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SaleDto } from 'src/sale/dto/sale.dto';
import { DashboardService } from './dashboard.service';
import { DashboardDto } from './dto/dashboard.dto';

@ApiTags('dashboards')
@Controller('dashboards')
@UseGuards(AuthGuard())
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  @ApiOkResponse({ type: DashboardDto, description: 'Response search sale' })
  @ApiQuery({ name: 'from_date', required: true })
  @ApiQuery({ name: 'to_date', required: true })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get()
  async findAll(
    @Query('from_date') from_date: string,
    @Query('to_date') to_date: string): Promise<DashboardDto> {
    return await this.dashboardService.findDashboardReport(from_date, to_date);
  }
}
