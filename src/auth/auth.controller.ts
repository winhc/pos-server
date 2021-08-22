import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserLoginRequestDto } from 'src/user/dto/user-login-request.dto';
import { AuthService } from './auth.service';
import { LoginStatus } from './interface/login-status.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    /**
     * login user
     */
    @ApiOkResponse({ description: 'Response login status' })
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @ApiInternalServerErrorResponse()
    @Post('login')
    async login(@Body() userLoginRequestDto: UserLoginRequestDto): Promise<LoginStatus> {
        return await this.authService.login(userLoginRequestDto);
    }
}
