import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {
  constructor(private _HttpClient:HttpClient){}
  getAllSubCategoriesOnCategory(category_id:string) :Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories/${category_id}/subcategories`);
  }
}
