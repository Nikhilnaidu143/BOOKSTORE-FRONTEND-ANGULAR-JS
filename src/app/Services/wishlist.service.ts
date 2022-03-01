import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Wishlist } from '../Models/Wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private httpClient: HttpClient) {}

  /** Adding to wishlist. */
  addToWishlist(token:string,bookId:number,wishlist:Wishlist) {
    return this.httpClient.post(`http://localhost:8085/wishlist/add/${token}/${bookId}` , wishlist , { responseType: "json" });
  }

  /** Get all wishlist items for specific user. */
  getAllWishlistItems(token : string) {
    return this.httpClient.get(`http://localhost:8085/wishlist/get/${token}`);
  }

  /** Delete item from wishlist. */
  deleteItem(book_id:number , token:String){
    return this.httpClient.delete(`http://localhost:8085/wishlist/delete/${book_id}/${token}`);
  }

}
