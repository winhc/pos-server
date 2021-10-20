import { UserTypeDto } from "src/user-type/dto/user-type-dto";
import { UserType } from "src/user-type/entities/user-type.entity";
import { UserTypeModel } from "../model/user-type.model";

export const toUserTypeModel = (data: UserType): UserTypeModel => {
    const { id, user_role, remarks, created_at, updated_at } = data;
    let userTypeModel: UserTypeModel = { id, user_role, remarks, created_at, updated_at };
    return userTypeModel;
};

export const toUserTypeDto = (data: UserTypeModel[] | UserTypeModel, count?: number): UserTypeDto => {
    const userTypeDto: UserTypeDto = {data, count};
    return userTypeDto;
};