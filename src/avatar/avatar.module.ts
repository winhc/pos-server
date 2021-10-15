import { Module } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { AvatarController } from './avatar.controller';
import { CategoryModule } from 'src/category/category.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports:[CategoryModule, ProductModule],
  controllers: [AvatarController],
  providers: [AvatarService]
})
export class AvatarModule {}
