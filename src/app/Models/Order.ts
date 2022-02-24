export class Order {
    price : number;
    quantity : number;
    address : string;
    book_id : number;

    constructor(price : number , quantity : number , address : string , book_id : number) {
        this.price = price;
        this.quantity = quantity;
        this.address = address;
        this.book_id = book_id;
    }
}