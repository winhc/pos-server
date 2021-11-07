import { Module } from '@nestjs/common';
import { PosService } from './pos.service';
import { PosController } from './pos.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryModule } from 'src/category/category.module';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports:[
    AuthModule,
    CategoryModule,
    CustomerModule
  ],
  controllers: [PosController],
  providers: [PosService]
})
export class PosModule {}
