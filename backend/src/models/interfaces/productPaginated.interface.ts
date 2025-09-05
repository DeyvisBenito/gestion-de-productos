import { Product } from "./product.interface";

export interface ProductPaginated {
    Products: Product[],
    Total: number
}