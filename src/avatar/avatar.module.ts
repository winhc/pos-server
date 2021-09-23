import { Module } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { AvatarController } from './avatar.controller';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports:[CategoryModule],
  controllers: [AvatarController],
  providers: [AvatarService]
})
export class AvatarModule {}
