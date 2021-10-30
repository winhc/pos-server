import { Injectable } from '@nestjs/common';
import { ProductTypeService } from 'src/product-type/product-type.service';
import { ProductDto } from 'src/product/dto/product.dto';
import { ProductService } from 'src/product/product.service';
import { CreateStoreProductDto } from 'src/store/dto/create-store-product.dto';
import { StoreProductDto } from 'src/store/dto/store-product.dto';
import { StoreProduct } from 'src/store/entities/store-product.entity';
import { StoreService } from 'src/store/store.service';
import { CreateSupplierProductDto } from 'src/supplier/dto/create-supplier-product.dto';
import { SupplierProductDto } from 'src/supplier/dto/supplier-product.dto';
import { SupplierService } from 'src/supplier/supplier.service';
import { ExportProductOptionDto } from './dto/export-product-option.dto';
import { ImportProductOptionDto } from './dto/import-product-option.dto';

@Injectable()
export class WarehouseService {
  constructor(
    private readonly productService: ProductService,
    private readonly productTypeService: ProductTypeService,
    private readonly supplierService: SupplierService,
    private readonly storeService: StoreService,
  ) { }

  /**
   * Insert new records into supplier and product relation table
   */
  async importProduct(createSupplierProductDto: CreateSupplierProductDto): Promise<SupplierProductDto> {
    return await this.supplierService.createSupplierProduct(createSupplierProductDto);
  }

  /**
   * Insert new records into store and product relation table
   */
  async exportProduct(createStoreProductDto: CreateStoreProductDto): Promise<StoreProductDto> {
    return await this.storeService.createStoreProduct(createStoreProductDto);
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

  async findAll(): Promise<SupplierProductDto> {
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
