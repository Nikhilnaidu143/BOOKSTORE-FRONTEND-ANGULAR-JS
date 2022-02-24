import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../Models/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient : HttpClient) { }

  /** Adding to cart. */
  addToCart(token:string,bookId:number,cart: Cart) {
    return this.httpClient.post(`http://localhost:8084/cart/add/${token}/${bookId}` , cart , { responseType: "json" });
  }

  /** Get all cart items. */
  getAll() {
    return this.httpClient.get(`http://localhost:8084/cart/getAll`);
  }

  /** Get all cart items for specific user. */
  getAllForSpecificUser(token : string) {
    return this.httpClient.get(`http://localhost:8084/cart/get/${token}`);
  }

  /** Delete item from cart. */
  deleteItem(book_id:number , token:String){
    return this.httpClient.delete(`http://localhost:8084/cart/delete/${book_id}/${token}`);
  }

}
