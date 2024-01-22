import { Product } from "../../domain/product/product";

export class ProductUseCase {
    static product: any;
    // private product: Product
    constructor(private product: Product) {
        // this.product = product
    }

    public static Run() {
        this.product.NewProduct()
    }
}