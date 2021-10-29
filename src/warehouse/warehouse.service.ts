import { Injectable } from '@nestjs/common';
import { ProductTypeService } from 'src/product-type/product-type.service';
import { ProductDto } from 'src/product/dto/product.dto';
import { ProductService } from 'src/product/product.service';
import { StoreService } from 'src/store/store.service';
import { SupplierProduct } from 'src/supplier/entities/supplier-product.entity';
import { SupplierService } from 'src/supplier/supplier.service';
import { ExportProductOptionDto } from './dto/export-product-option.dto';
import { ExportProductDto } from './dto/export-product.dto';
import { ImportProductOptionDto } from './dto/import-product-option.dto';
import { ImportProductDto } from './dto/import-product.dto';

@Injectable()
export class WarehouseService {
  constructor(
    private readonly productService: ProductService,
    private readonly productTypeService: ProductTypeService,
    private readonly supplierService: SupplierService,
    private readonly storeService: StoreService,
  ) { }

  async importProduct(id: number, importProductDto: ImportProductDto): Promise<ProductDto> {
    return await this.productService.importProduct(id, importProductDto);
  }

  async exportProduct(id: number, exportProductDto: ExportProductDto): Promise<ProductDto> {
    return await this.productService.exportProduct(id, exportProductDto);
  }

  /**
   * import option
   */
  async findImportProductOption(): Promise<ImportProductOptionDto> {
    const product = await this.productService.findImportExportProductOption({ isExport: false });
    const product_type = await this.productTypeService.find();
    const supplier = await this.supplierService.find();
    const data: ImportProductOptionDto = { product, product_type, supplier };
    return data;
  }

  /**
   * export option
   */
  async findExportProductOption(): Promise<ExportProductOptionDto> {
    const product = await this.productService.findImportExportProductOption({ isExport: true });
    const product_type = await this.productTypeService.find();
    const store = await this.storeService.find();
    const data: ExportProductOptionDto = { product, product_type, store };
    return data;
  }

  async findAll(): Promise<SupplierProduct[]> {
    return await this.supplierService.findSupplierProduct();
  }


  findOne(id: number) {
    return `This action returns a #${id} warehouse`;
  }

  // update(id: number, updateWarehouseDto: UpdateWarehouseDto) {
  //   return `This action updates a #${id} warehouse`;
  // }

  remove(id: number) {
    return `This action removes a #${id} warehouse`;
  }
}
