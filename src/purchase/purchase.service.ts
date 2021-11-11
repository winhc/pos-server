import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toPurchaseDto, toPurchaseModel } from 'src/helper/mapper/purchase.mapper';
import { formattedDate } from 'src/helper/utils';
import { ProductService } from 'src/product/product.service';
import { SupplierService } from 'src/supplier/supplier.service';
import { Repository } from 'typeorm';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchaseOptionDto } from './dto/purchase-option.dto';
import { PurchaseDto } from './dto/purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';
const logger = new Logger('PurchaseService');

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase) private readonly purchaseRepository: Repository<Purchase>,
    private readonly productService: ProductService,
    private readonly supplierService: SupplierService,
  ) { }

  async create(createPurchaseDto: CreatePurchaseDto): Promise<PurchaseDto> {
    const purchase: Purchase = this.purchaseRepository.create(createPurchaseDto);
    try {
      const purchaseData = await this.purchaseRepository.save(purchase);
      await this.productService.updatePurchaseProduct(+JSON.stringify(purchaseData.product), purchaseData.quantity);
    } catch (error) {
      logger.error(`create: ${error}`);
      throw new InternalServerErrorException({ message: 'Create purchase fail' });
    }
    const data = toPurchaseModel(purchase);
    return toPurchaseDto(data);
  }

  async findAll(supplier_name?: string, page_size?: number, page_index?: number, from_date?: string, to_date?: string): Promise<PurchaseDto> {
    logger.log(`page_size: ${page_size}, page_index: ${page_index}, supplier_name: ${supplier_name}, from_date: ${from_date}, to_date: ${to_date}`)
    try {

      // Option 1
      if (supplier_name && from_date && to_date && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [purchase, count] = await this.purchaseRepository.createQueryBuilder('purchase')
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('purchase.supplier', 'supplier')
          .leftJoinAndSelect('purchase.product', 'product')
          .andWhere('supplier.supplier_name LIKE :s_name', { s_name: `%${supplier_name}%` })
          .orderBy('purchase.id')
          .getManyAndCount()
        const data = purchase.map(value => toPurchaseModel(value));
        return toPurchaseDto(data, count);
      }
      // Option 2
      else if (from_date && to_date && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [purchase, count] = await this.purchaseRepository.createQueryBuilder('purchase')
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('purchase.supplier', 'supplier')
          .leftJoinAndSelect('purchase.product', 'product')
          .where('DATE(purchase.updated_at) BETWEEN :start_date AND :end_date', { start_date: formattedDate(from_date), end_date: formattedDate(to_date) })
          .orderBy('purchase.id')
          .getManyAndCount()
        const data = purchase.map(value => toPurchaseModel(value));
        return toPurchaseDto(data, count);
      }
      // Option 3
      else if (supplier_name && page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [purchase, count] = await this.purchaseRepository.createQueryBuilder('purchase')
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('purchase.supplier', 'supplier')
          .leftJoinAndSelect('purchase.product', 'product')
          .where('supplier.supplier_name LIKE :s_name', { s_name: `%${supplier_name}%` })
          .orderBy('purchase.id')
          .getManyAndCount()
        const data = purchase.map(value => toPurchaseModel(value));
        return toPurchaseDto(data, count)
      }
      // Option 4
      else if (page_size && page_index) {
        const fromIndex = (page_index - 1) * page_size;
        const takeLimit = page_size;

        const [purchase, count] = await this.purchaseRepository.createQueryBuilder('purchase')
          .skip(fromIndex)
          .take(takeLimit)
          .leftJoinAndSelect('purchase.supplier', 'supplier')
          .leftJoinAndSelect('purchase.product', 'product')
          .orderBy('purchase.id')
          .getManyAndCount()
        const data = purchase.map(value => toPurchaseModel(value));
        return toPurchaseDto(data, count)
      }
      // Option 5
      else {
        const [purchase, count] = await this.purchaseRepository.createQueryBuilder('purchase')
          .leftJoinAndSelect('purchase.supplier', 'supplier')
          .leftJoinAndSelect('purchase.product', 'product')
          .orderBy('purchase.id')
          .getManyAndCount()
        const data = purchase.map(value => toPurchaseModel(value));
        return toPurchaseDto(data, count);
      }
    } catch (error) {
      logger.error(`findAll: ${error}`);
      throw new BadRequestException({ message: 'Purchase not found' });
    }
  }

  async findPurchaseOptions(): Promise<PurchaseOptionDto> {
    const product = await this.productService.findAll();
    const supplier = await this.supplierService.findAll();
    const purchaseOptionDto: PurchaseOptionDto = {
      product,
      supplier
    };
    return purchaseOptionDto;
  }

  async findOne(id: number): Promise<Purchase> {
    try {
      return await this.purchaseRepository.findOneOrFail(id);
    } catch (error) {
      logger.warn(`findOne : ${error}`);
      throw new BadRequestException({ message: 'Purchase not found' });
    }
  }

  async findById(id: number): Promise<PurchaseDto> {
    try {
      const product = await this.findOne(id);
      const data = toPurchaseModel(product);
      return toPurchaseDto(data);
    } catch (error) {
      throw new BadRequestException({ message: 'Purchase not found' });
    }
  }

  async update(id: number, updatePurchaseDto: UpdatePurchaseDto): Promise<PurchaseDto> {
    const purchase = await this.findOne(id);
    if (!purchase) {
      throw new BadRequestException({ message: 'Purchase not found' });
    }
    try {
      updatePurchaseDto.updated_at = new Date();

      const purchaseToUpdate = Object.assign(purchase, updatePurchaseDto);
      await this.purchaseRepository.update(id, purchaseToUpdate);
    } catch (error) {
      logger.error(`update : ${error}`);
      throw new InternalServerErrorException({ message: 'Update purchase fail' })
    }
    const updateProduct = await this.findOne(purchase.id);
    const data = toPurchaseModel(updateProduct);
    return toPurchaseDto(data);
  }

  async remove(id: number): Promise<PurchaseDto> {
    const purchase = await this.findOne(id);
    if (!purchase) {
      throw new BadRequestException({ message: 'Purchase not found' });
    }
    const deletePurchase = await this.purchaseRepository.remove(purchase);
    const data = toPurchaseModel(deletePurchase);
    return toPurchaseDto(data);
  }
}
