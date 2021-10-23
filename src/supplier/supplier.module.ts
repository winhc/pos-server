import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Supplier])
  ],
  controllers: [SupplierController],
  providers: [SupplierService],
  exports:[SupplierService]
})
export class SupplierModule {}
