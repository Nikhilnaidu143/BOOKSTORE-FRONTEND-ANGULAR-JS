import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order_ids: any = [];

  constructor(private httpClient: HttpClient) { }

  /** Placing order */
  placeOrder(token: string, order: any) {
    return this.httpClient.post(`http://localhost:8083/order/place/${token}`, order, { responseType: "json" });
  }

  saveOrderIds(orderIds: any) {
    this.order_ids.push(orderIds);
  }

  retriveIds() {
    return this.order_ids;
  }

}
