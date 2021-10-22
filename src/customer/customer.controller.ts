import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerDto } from './dto/customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@ApiTags('customers')
@Controller('customers')
@UseGuards(AuthGuard())
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  /**
   * create new customer
   */
  @ApiCreatedResponse({ type: CustomerDto, description: 'Response cerated customer' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<CustomerDto> {
    return await this.customerService.create(createCustomerDto);
  }

  /**
   * find all customer OR
   * search customer by customer_name 
   */
  @ApiOkResponse({ type: CustomerDto, isArray: false, description: 'Response all customers or search customer by customer_name' })
  @ApiQuery({ name: 'page_size', required: false })
  @ApiQuery({ name: 'page_index', required: false })
  @ApiQuery({ name: 'customer_name', required: false })
  @ApiQuery({ name: 'from_date', required: false })
  @ApiQuery({ name: 'to_date', required: false })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get()
  async findAll(
    @Query('page_size') page_size?: number,
    @Query('page_index') page_index?: number,
    @Query('customer_name') customer_name?: string,
    @Query('from_date') from_date?: string,
    @Query('to_date') to_date?: string): Promise<CustomerDto> {
    return await this.customerService.findAll(+page_size, +page_index, customer_name, from_date, to_date);
  }

  /**
   * get customer by id
   */
  @ApiOkResponse({ type: CustomerDto, description: 'Response search customer' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<CustomerDto> {
    return this.customerService.findById(id);
  }

  /**
   * update customer by id
   */
  @ApiOkResponse({ type: CustomerDto, description: 'Response updated customer' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCustomerDto: UpdateCustomerDto): Promise<CustomerDto> {
    return await this.customerService.update(id, updateCustomerDto);
  }

  /**
   * delete customer by id
   */
  @ApiOkResponse({ type: CustomerDto, description: 'Response deleted customer' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<CustomerDto> {
    return await this.customerService.remove(id);
  }
}
