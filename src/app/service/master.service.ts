import { Customer, Login } from './../model/ApiResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '../model/ApiResponseModel';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl : string = "https://freeapi.miniprojectideas.com/api/BigBasket/";

  

  constructor(private http: HttpClient) { }

  getAllProducts() : Observable<ApiResponseModel>{
    return this.http.get<ApiResponseModel>(this.apiUrl+"GetAllProducts");
  }

  getAllCategory() : Observable<ApiResponseModel>{
    return this.http.get<ApiResponseModel>(this.apiUrl+"GetAllCategory");
  }
  getAllProductsByCategoryId(categoryId : number) : Observable<ApiResponseModel>{
    const url = `${this.apiUrl}GetAllProductsByCategoryId?id=${categoryId}`;//template literal
    return this.http.get<ApiResponseModel>(url);
  }

  registerCustomer(obj : Customer) : Observable<ApiResponseModel>{
    const url = `${this.apiUrl}RegisterCustomer`;//template literal
    return this.http.post<ApiResponseModel>(url, obj);
  }
  loginCustomer(obj : Login) : Observable<ApiResponseModel>{
    const url = `${this.apiUrl}Login`;//template literal
    return this.http.post<ApiResponseModel>(url, obj);
  }
  
}
