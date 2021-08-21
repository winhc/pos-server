import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/helper/jwt.constant';
import { OperationStatus } from 'src/helper/operation.status';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserLoginReplyDto } from 'src/user/dto/user-login-reply.dto';
import { UserLoginRequestDto } from 'src/user/dto/user-login-request.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginStatus } from './interface/login-status.interface';
import { JwtPayload } from './interface/payload.interface';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

    async create(createUserDto: CreateUserDto): Promise<UserDto> {
        return this.userService.create(createUserDto);
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

    async findAll(account?: string): Promise<UserDto[]> {
        return await this.userService.findAll(account);
    }

    async findOne(id: number): Promise<UserDto> {
        return await this.userService.findById(id);
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<OperationStatus> {
        let status: OperationStatus = {
            success: true,
            message: 'Update user success'
        }
        try {
            await this.userService.update(id, updateUserDto);
        } catch (err) {
            status = {
                success: false,
                message: err,
            };
        }

        return status;
    }

    async remove(id: number): Promise<OperationStatus> {
        let status: OperationStatus = {
            success: true,
            message: 'Delete user success'
        }
        try {
            await this.userService.remove(id);
        } catch (err) {
            status = {
                success: false,
                message: err,
            };
        }

        return status;
    }

}
