import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Daum, IWishList } from '../../../core/interfaces/iwish-list.interface';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
    whishListItems:BehaviorSubject<IWishList> = new BehaviorSubject({} as IWishList);
  
  constructor(private _HttpClient:HttpClient){}
  // https://ecommerce.routemisr.com/api/v1/wishlist
  addProductToWishlist(p_id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,{productId:p_id});
  }
  // https://ecommerce.routemisr.com/api/v1/wishlist/61e81f641904360ec15c6db1
  removeproductfromWishlist(p_id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${p_id}`);
  }
  // https://ecommerce.routemisr.com/api/v1/wishlist
  getLoggedUserWishlist(): Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist/`);
  }
}
