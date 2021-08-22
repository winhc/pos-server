import { UserLoginReplyDto } from "src/user/dto/user-login-reply.dto";
import { UserDto } from "src/user/dto/user.dto";
import { User } from "src/user/entities/user.entity";

export const toUserLoginReplyDto = (data: User): UserLoginReplyDto => {  
    const { id, name, account, type } = data;
    let userLoginReplyDto: UserLoginReplyDto = { id, name, account, type};
    return userLoginReplyDto;
};

export const toUserDto = (data: User): UserDto => {  
    const { id, name, account, password, type, remarks, created_at, updated_at } = data;
    let userDto: UserDto = { id, name, account, password, type, remarks, created_at, updated_at};
    return userDto;
};