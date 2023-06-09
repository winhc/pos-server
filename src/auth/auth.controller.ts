import { Body, Controller, Get, Logger, Post, Req, UseGuards, Headers, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserLoginRequestDto } from 'src/user/dto/user-login-request.dto';
import { AuthService } from './auth.service';
import { LoginStatus } from './interface/login-status.interface';
import { JwtPayload } from './interface/payload.interface';
const logger = new Logger('AuthController');

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    /**
     * login user
     * default http response code is 201 for POST request
     * ===> in here, HTTP 200 OK success status response code for login
     */
    @ApiOkResponse({ description: 'Response login status' })
    @ApiNotFoundResponse({ description: 'Api not found' })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized login' })
    @HttpCode(200)
    @Post('login')
    async login(@Body() userLoginRequestDto: UserLoginRequestDto, @Headers() headers): Promise<LoginStatus> {
        console.log('headers:', headers);
        // logger.log(userLoginRequestDto);
        return await this.authService.login(userLoginRequestDto);
    }

    /**
     * check user login data
     */
     @Get('whoami')
     @UseGuards(AuthGuard())
     async whoAmI(@Req() req: any, @Headers() headers): Promise<JwtPayload> {
        //  console.log('headers', headers);
         return req.user;
     }
}
