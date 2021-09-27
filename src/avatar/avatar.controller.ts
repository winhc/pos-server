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
  @ApiOkResponse({ type: String, description: 'Response image' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get('category/:id/:name')
  async getImage(@Param('id') id: number, @Param('name') name: string, @Res() res): Promise<any> {
    const image_url = await this.avatarService.findCategoryImage(id, name);
    if (image_url) {
      res.sendFile(image_url, { root: 'avatars' });
    }
  }
}
