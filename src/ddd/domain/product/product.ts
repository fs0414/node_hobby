import { ulid} from 'ulid'
import { DomainError } from "../domain_error";

const nameLengthMin = 1
const nameLengthMax = 100

const descriptionLengthMin = 1
const descriptionLengthMax = 1000


export class Product {
    id: string; 
    ownerID: string;
    name: string;
    description: string;
    price: number;
    stock: number;


    constructor(
        id: string,
        ownerID: string,
        name: string,
        description: string,
        price: number,
        stock: number,
    ) {
        this.id = id
        this.ownerID = ownerID
        this.name = name
        this.description = description
        this.price = price
        this.stock = stock

    }

    private static newProduct(
        id: string,
        ownerID: string,
        name: string,
        description: string,
        price: number,
        stock: number,
    ) {
        if(name.length < nameLengthMin || name.length > nameLengthMax) {
            return new DomainError('商品名の値が不正です')
        }
        if(description.length < descriptionLengthMin || description.length > descriptionLengthMax)
        if(price < 1) {
            return new DomainError('価格の値が不正です')
        }
        if(stock < 0) {
            return new DomainError('在庫数の値が不正です')
        }
        //Product class初期化
        return new Product( id, ownerID, name, description, price, stock )
    }

    // idを含めず、productの再生成を担当
    public static Reconastruct(
        id: string,
        ownerID: string,
        name: string,
        description: string,
        price: number,
        stock: number,
    ) {
        return this.newProduct(id, ownerID, name, description, price, stock)
    }

    // productの生成を担当
    public static NewProduct(
        ownerID: string,
        name: string,
        description: string,
        price: number,
        stock: number,       
    ) {
        return this.newProduct(ulid(), ownerID, name, description, price, stock)
        
    }
}