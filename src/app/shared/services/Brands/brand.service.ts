import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  constructor(private  _HttpClient:HttpClient){}
  getAllBrands(pageNumber:Number):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands?limit=27&page=${pageNumber}`);
    // https://ecommerce.routemisr.com/api/v1/brands?limit=27
  }
}
