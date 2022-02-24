export class Cart {
    book_id:number;
    quantity:number;

    constructor(book_id:number , quantity:number) {
        this.book_id = book_id;
        this.quantity = quantity;
    }
}