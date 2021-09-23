import { Controller, Get, Param, Res } from '@nestjs/common';
import { AvatarService } from './avatar.service';

@Controller('avatars')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  /**
   * get category image
   */
   @Get('category/:id')
   async getImage(@Param('id') id, @Res() res): Promise<any> {
     const image_url = await this.avatarService.findCategoryImage(id);
     if(image_url){
       res.sendFile(image_url, { root: 'avatars'});
     }
   }
}
