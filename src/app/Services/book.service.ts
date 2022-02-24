import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient : HttpClient) { }

  /** Retrive all data from database. */
  readAllCall(token : string) {
    return this.httpClient.get(`http://localhost:8082/book/readAll/${token}`);
  }

  /** Sort in ascending order. */
  sortAsc(token: string) {
    return this.httpClient.get(`http://localhost:8082/book/sortASC/${token}`);
  }

  /** Sort in descending order. */
  sortDesc(token: string) {
    return this.httpClient.get(`http://localhost:8082/book/sortDESC/${token}`);
  }

  /** Search book by book name. */
  searchBook(bookName: string , token: string) {
    if(bookName != "") {
      return this.httpClient.get(`http://localhost:8082/book/search/${bookName}/${token}`);
    }
    if(bookName == "") {
      return this.httpClient.get(`http://localhost:8082/book/readAll/${token}`);
    }
  }

  /** Retrive book by id. */
  getById(id: any , token: string) {
    return this.httpClient.get(`http://localhost:8082/book/read/${id}/${token}`);
  }

  /** Changing quantity. */
  changeQuantity(id:any , token:string, newQuantity:number){
    return this.httpClient.get(`http://localhost:8082/book/quantity/${id}/${token}?new_quantity=${newQuantity}`);
  }

  /** Changing price. */
  changePrice(id:any , token:string, newPrice:number){
    return this.httpClient.get(`http://localhost:8082/book/price/${id}/${token}?new_price=${newPrice}`);
  }
}
