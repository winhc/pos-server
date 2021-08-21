import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { OperationStatus } from 'src/helper/operation.status';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserLoginRequestDto } from 'src/user/dto/user-login-request.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { LoginStatus } from './interface/login-status.interface';
import { JwtPayload } from './interface/payload.interface';

@ApiTags('users')
@Controller('users')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    /**
     * login user
     */
    @Post('login')
    async login(@Body() userLoginRequestDto: UserLoginRequestDto): Promise<LoginStatus> {
        return await this.authService.login(userLoginRequestDto);
    }

    /**
     * create new user account
     */
    @Post()
    @UseGuards(AuthGuard())
    async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
        return await this.authService.create(createUserDto);;
    }

    /**
     * get all users OR
     * search user by account
     */
    @Get()
    @UseGuards(AuthGuard())
    async findAll(@Query('account') account?: string): Promise<UserDto[]> {
        return await this.authService.findAll(account);
    }

    /**
     * get user by id
     */
    @Get(':id')
    @UseGuards(AuthGuard())
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
        return await this.authService.findOne(id);
    }

    /**
     * update user by id
     */
    @Patch(':id')
    @UseGuards(AuthGuard())
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<OperationStatus> {
        return await this.authService.update(id, updateUserDto);
    }

    /**
     * delete user by id
     */
    @Delete(':id')
    @UseGuards(AuthGuard())
    async remove(@Param('id', ParseIntPipe) id: number): Promise<OperationStatus> {
        return await this.authService.remove(id);
    }

    /**
     * check user login data
     */
    @Get('whoami')
    @UseGuards(AuthGuard())
    async whoAmI(@Req() req: any): Promise<JwtPayload> {
        return req.user;
    }

}
