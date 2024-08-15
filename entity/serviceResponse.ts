import {Product} from "./product";

export class ServiceResponse {
    status: string;
    message: string;
    data: Product;

    constructor(status: string, message: string, data: Product) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}