import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { OrderDto } from './dto/order.dto';
import { UserModel } from 'src/helper/model/user.model';

@ApiTags('orders')
@Controller('orders')
@UseGuards(AuthGuard())
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  /**
   * create new order
   */
  @ApiCreatedResponse({ description: 'Response cerated order' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto[], @Req() req: any): Promise<any> {
    const user = <UserModel>req.user;
    return await this.orderService.create(createOrderDto, user);
  }

  /**
   * find all order OR
   * search order by order_code
   */
  @ApiOkResponse({ type: OrderDto, isArray: false, description: 'Response all order or search order by order_code' })
  @ApiQuery({ name: 'page_size', required: false })
  @ApiQuery({ name: 'page_index', required: false })
  @ApiQuery({ name: 'order_code', required: false })
  @ApiQuery({ name: 'from_date', required: false })
  @ApiQuery({ name: 'to_date', required: false })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get()
  async findAll(
    @Query('page_size') page_size?: number,
    @Query('page_index') page_index?: number,
    @Query('order_code') order_code?: string,
    @Query('from_date') from_date?: string,
    @Query('to_date') to_date?: string): Promise<OrderDto> {
    return await this.orderService.findAll(order_code, +page_size, +page_index, from_date, to_date);
  }

  /**
   * get order by id
   */
  @ApiOkResponse({ type: OrderDto, description: 'Response search order' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<OrderDto> {
    return await this.orderService.findById(id);
  }

  /**
   * update order by id
   */
  @ApiOkResponse({ type: OrderDto, description: 'Response updated order' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto): Promise<OrderDto> {
    return await this.orderService.update(id, updateOrderDto);
  }

  /**
   * delete order by id
   */
  @ApiOkResponse({ type: OrderDto, description: 'Response deleted order' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<OrderDto> {
    return this.orderService.remove(id);
  }
}
