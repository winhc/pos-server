import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Put, Logger, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from 'src/auth/interface/payload.interface';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard())
export class UserController {
    constructor(private readonly userService: UserService) { }

    /**
     * create new user account
     */
    @ApiCreatedResponse({ type: UserDto, description: 'Response cerated user' })
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
        return await this.userService.create(createUserDto);
    }

    /**
     * get all users OR
     * search user by account
     */
    @ApiOkResponse({ type: UserDto, isArray: false, description: 'Response all users or search user by account' })
    @ApiQuery({ name: 'page_size', required: false })
    @ApiQuery({ name: 'page_index', required: false })
    @ApiQuery({ name: 'account', required: false })
    @ApiQuery({ name: 'from_date', required: false })
    @ApiQuery({ name: 'to_date', required: false })
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    @Get()
    async findAll(
        @Query('page_size') page_size?: number,
        @Query('page_index') page_index?: number,
        @Query('account') account?: string,
        @Query('from_date') from_date?: string,
        @Query('to_date') to_date?: string): Promise<UserDto> {
        return await this.userService.findAll(+page_size, +page_index, account, from_date, to_date);
    }

    /**
     * get user by id
     */
    @ApiOkResponse({ type: UserDto, description: 'Response search user' })
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
        return await this.userService.findById(id);
    }

    /**
     * update user by id
     */
    @ApiOkResponse({ type: UserDto, description: 'Response updated user' })
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
        return await this.userService.update(id, updateUserDto);
    }

    /**
     * update user by id
     */
    @ApiOkResponse({ type: UserDto, description: 'Response updated user' })
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    @Patch('password/:id')
    async updatePassword(@Param('id', ParseIntPipe) id: number, @Body() updatePasswordDto: UpdatePasswordDto): Promise<UserDto> {
        return await this.userService.updatePassword(id, updatePasswordDto);
    }

    /**
     * delete user by id
     */
    @ApiOkResponse({ type: UserDto, description: 'Response deleted user' })
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
        return await this.userService.remove(id);
    }
}
