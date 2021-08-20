import { UserLoginReplyDto } from "src/user/dto/user-login-reply.dto";
import { User } from "src/user/entities/user.entity";

export const toUserLoginReplyDto = (data: User): UserLoginReplyDto => {  
    const { id, name, account, type } = data;
    let userLoginReplyDto: UserLoginReplyDto = { id, name, account, type};
    return userLoginReplyDto;
};