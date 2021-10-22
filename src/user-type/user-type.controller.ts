import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserTypeService } from './user-type.service';
import { CreateUserTypeDto } from './dto/create-user-type.dto';
import { UpdateUserTypeDto } from './dto/update-user-type.dto';
import { UserTypeDto } from './dto/user-type-dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('user-types')
@Controller('user-types')
@UseGuards(AuthGuard())
export class UserTypeController {
  constructor(private readonly userTypeService: UserTypeService) { }

  /**
   * create new user type
   */
  @ApiCreatedResponse({ type: UserTypeDto, description: 'Response cerated user type' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Post()
  create(@Body() createUserTypeDto: CreateUserTypeDto) {
    return this.userTypeService.create(createUserTypeDto);
  }

  /**
   * find all user type OR
   * search user type by role
   */
  @ApiOkResponse({ type: UserTypeDto, isArray: false, description: 'Response all user type or search user type by role' })
  @ApiQuery({ name: 'page_size', required: false })
  @ApiQuery({ name: 'page_index', required: false })
  @ApiQuery({ name: 'role', required: false })
  @ApiQuery({ name: 'from_date', required: false })
  @ApiQuery({ name: 'to_date', required: false })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get()
  async findAll(
    @Query('page_size') page_size?: number,
    @Query('page_index') page_index?: number,
    @Query('user_role') user_role?: string,
    @Query('from_date') from_date?: string,
    @Query('to_date') to_date?: string): Promise<UserTypeDto> {
    return await this.userTypeService.findAll(+page_size, +page_index, user_role, from_date, to_date);
  }

  /**
   * get user type by id
   */
  @ApiOkResponse({ type: UserTypeDto, description: 'Response search user type by id' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserTypeDto> {
    return this.userTypeService.findById(id);
  }

  /**
   * update brand by id
   */
  @ApiOkResponse({ type: UserTypeDto, description: 'Response updated user type' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserTypeDto: UpdateUserTypeDto): Promise<UserTypeDto> {
    return await this.userTypeService.update(id, updateUserTypeDto);
  }

  /**
   * delete brand by id
   */
  @ApiOkResponse({ type: UserTypeDto, description: 'Response deleted user type' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<UserTypeDto> {
    return await this.userTypeService.remove(id);
  }
}
