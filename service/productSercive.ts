import {ServiceResponse} from "../entity/serviceResponse";
import {Product} from "../entity/product";

const url: string = 'https://world.openfoodfacts.org/api/v3/product/';

export const searchProduct = (barcode: string): Promise<ServiceResponse> => {
    return fetch(url + barcode + '.json').then(response => response.json().then(data => {
        if (data.status === "failure") {
            return new ServiceResponse(data.status, data.result.name, new Product("", 0));
        } else {
            return new ServiceResponse(data.status, data.result.name, new Product(data.product.product_name_de, 1));
        }
    }))
}