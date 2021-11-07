import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
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
}
