import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserLoginRequestDto } from 'src/user/dto/user-login-request.dto';
import { AuthService } from './auth.service';
import { LoginStatus } from './interface/login-status.interface';
import { JwtPayload } from './interface/payload.interface';
import { RegistrationStatus } from './interface/registration-status.interface';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService) { }

    @Post('register')
    public async register(@Body() createUserDto: CreateUserDto): Promise<RegistrationStatus> {
        const result: RegistrationStatus = await this.authService.register(createUserDto);

        if (!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
        }

        return result;
    }

    @Post('login')
    public async login(@Body() userLoginRequestDto: UserLoginRequestDto): Promise<LoginStatus> {
        return await this.authService.login(userLoginRequestDto);
    }

    @Get('whoami')
    @UseGuards(AuthGuard())
    public async testAuth(@Req() req: any): Promise<JwtPayload> {
        return req.user;
    }

}
