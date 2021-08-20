import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/helper/jwt.constant';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserLoginReplyDto } from 'src/user/dto/user-login-reply.dto';
import { UserLoginRequestDto } from 'src/user/dto/user-login-request.dto';
import { UserService } from 'src/user/user.service';
import { LoginStatus } from './interface/login-status.interface';
import { JwtPayload } from './interface/payload.interface';
import { RegistrationStatus } from './interface/registration-status.interface';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

    async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,
            message: 'user registered',
        };

        try {
            await this.userService.createUser(userDto);
        } catch (err) {
            status = {
                success: false,
                message: err,
            };
        }

        return status;
    }

    async login(userLoginRequestDto: UserLoginRequestDto): Promise<LoginStatus> {
        // find user in db
        const user = await this.userService.findByLogin(userLoginRequestDto);

        // generate and sign token
        const token = this._createToken(user);

        return {
            acount: user.account,
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
