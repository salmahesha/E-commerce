import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private readonly _HttpClient =inject(HttpClient);
  CheckoutSession(c_id:string ,shippingAddress:object ):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${c_id}?url=${environment.domain}`,shippingAddress);
  }
  getUserOrders(user_id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${user_id}`);
  }
  createCashOrder(c_id:string,shippingAddress:object):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/${c_id}`,shippingAddress);
  }
}
