import { Injectable } from '@nestjs/common';
import { SupplierProduct } from 'src/supplier/entities/supplier-product.entity';
import { SupplierService } from 'src/supplier/supplier.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

@Injectable()
export class WarehouseService {
  constructor(private readonly supplierService: SupplierService){}
  create(createWarehouseDto: CreateWarehouseDto) {
    return 'This action adds a new warehouse';
  }

  async findAll(): Promise<SupplierProduct[]> {
    return await this.supplierService.findSupplierProduct();
  }

  findOne(id: number) {
    return `This action returns a #${id} warehouse`;
  }

  update(id: number, updateWarehouseDto: UpdateWarehouseDto) {
    return `This action updates a #${id} warehouse`;
  }

  remove(id: number) {
    return `This action removes a #${id} warehouse`;
  }
}
