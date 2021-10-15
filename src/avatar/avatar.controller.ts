import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AvatarService } from './avatar.service';

@ApiTags('avatars')
@Controller('avatars')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) { }

  /**
   * get category image
   */
  @ApiOkResponse({ type: String, description: 'Response category image' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get('categories/:id/:name')
  async getCategoryImage(@Param('id') id: number, @Param('name') name: string, @Res() res): Promise<any> {
    const image_url = await this.avatarService.findCategoryImage(id, name);
    if (image_url) {
      res.sendFile(image_url, { root: 'avatars/category' });
    }
  }

  /**
   * get product image
   */
   @ApiOkResponse({ type: String, description: 'Response product image' })
   @ApiNotFoundResponse()
   @ApiBadRequestResponse()
   @ApiInternalServerErrorResponse()
   @Get('products/:id/:name')
   async getProductImage(@Param('id') id: number, @Param('name') name: string, @Res() res): Promise<any> {
     const image_url = await this.avatarService.findProductImage(id, name);
     if (image_url) {
       res.sendFile(image_url, { root: 'avatars/product' });
     }
   }
}
