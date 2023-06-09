import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/helper/constant/jwt.constant';
import { UserLoginReplyDto } from 'src/user/dto/user-login-reply.dto';
import { UserLoginRequestDto } from 'src/user/dto/user-login-request.dto';
import { UserService } from 'src/user/user.service';
import { LoginStatus } from './interface/login-status.interface';
import { JwtPayload } from './interface/payload.interface';

@Injectable()
export class AuthService {
    constructor(@Inject(forwardRef(() => UserService))
    private userService: UserService, private readonly jwtService: JwtService) { }

    async login(userLoginRequestDto: UserLoginRequestDto): Promise<LoginStatus> {
        // find user in db
        const user = await this.userService.findByLogin(userLoginRequestDto);

        // generate and sign token
        const token = this._createToken(user);

        return {
            user,
            ...token,
        };
    }

    private _createToken({ account }: UserLoginReplyDto): any {
        const expiresIn = jwtConstants.EXPIRE_IN;

        const user: JwtPayload = { account };
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn,
            accessToken,
        };
    }

    async validateUser(payload: JwtPayload): Promise<UserLoginReplyDto> {
        const user = await this.userService.findByPayload(payload);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

}
