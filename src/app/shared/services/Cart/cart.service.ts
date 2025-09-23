import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICart } from '../../../core/interfaces/icart.interface';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  cartItems:BehaviorSubject<ICart> = new BehaviorSubject({} as ICart);
  cartCount:BehaviorSubject<number> = new BehaviorSubject(0);
  private readonly _HttpClient =inject(HttpClient);
  getLogUserCart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart/`);
  }
  AddProductToCart(p_id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,{productId:p_id});
  }
  removeSpecificCartItem(p_id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${p_id}`);
  }
  updateCartProductQuantity(p_id:string,count:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${p_id}`,{count:count});
  }
  clearUserCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`);
  }

}
