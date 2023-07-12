import apiClientH from "./ApiClientH";
import { ItemRequest } from "../model/request/ItemRequest";

export default {
    createItem(item: ItemRequest) {
        return apiClientH.post(`/item`, item);
    },
    getItems() {
        return apiClientH.get(`/item`);
    },
    getItem(id: number) {
        return apiClientH.get(`/item/${id}`);
    },
    updateItem(id: number, item: ItemRequest) {
        return apiClientH.put(`/item/${id}`, item);
    },
    deleteItem(id: number) {
        return apiClientH.delete(`/item/${id}`);
    }
}