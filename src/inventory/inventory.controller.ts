import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { InventoryDto } from './dto/inventory.dto';
import { InventoryService } from './inventory.service';

@ApiTags('inventories')
@Controller('inventories')
@UseGuards(AuthGuard())
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }

  /**
   * find all inventory
   */
  @ApiOkResponse({ type: InventoryDto, description: 'Response all product or search product by product_name' })
  //  @ApiQuery({ name: 'page_size', required: false })
  //  @ApiQuery({ name: 'page_index', required: false })
  //  @ApiQuery({ name: 'product_name', required: false })
  //  @ApiQuery({ name: 'from_date', required: false })
  //  @ApiQuery({ name: 'to_date', required: false })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get()
  async findAll(): Promise<InventoryDto> {
    return await this.inventoryService.findAll();
  }
}
