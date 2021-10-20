import { UserLoginReplyDto } from "src/user/dto/user-login-reply.dto";
import { UserDto } from "src/user/dto/user.dto";
import { User } from "src/user/entities/user.entity";
import { UserModel } from "../model/user.model";

export const toUserLoginReplyDto = (data: User): UserLoginReplyDto => {
    const { id, name, account, user_type } = data;
    let userLoginReplyDto: UserLoginReplyDto = { id, name, account, user_type };
    return userLoginReplyDto;
};

export const toUserModel = (data: User): UserModel => {
    const { id, name, account, user_type, remarks, created_at, updated_at } = data;
    let userModel: UserModel = { id, name, account, user_type, remarks, created_at, updated_at };
    return userModel;
};

export const toUserDto = (data: UserModel[] | UserModel, count?: number): UserDto => {
    const userDto: UserDto = {data, count};
    return userDto;
};