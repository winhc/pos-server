import { StoreDto } from "src/store/dto/store.dto";
import { Store } from "src/store/entities/store.entity";
import { StoreModel } from "../model/store.model";

export const toStoreModel = (data: Store): StoreModel => {
    const { id, store_name, address, remarks, created_at, updated_at } = data;
    const storeModel: StoreModel = { id, store_name, address, remarks, created_at, updated_at };
    return storeModel;
};

export const toStoreDto = (data: StoreModel[] | StoreModel, count?: number): StoreDto => {
    const storeDto: StoreDto = { data, count };
    return storeDto;
}
