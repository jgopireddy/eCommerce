import { CartModel, Customer, Login, OrderModel } from './../model/ApiResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiResponseModel } from '../model/ApiResponseModel';
import { Constant } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl : string = "https://freeapi.miniprojectideas.com/api/BigBasket/";

  onCartAdd : Subject<boolean> = new Subject<boolean>();
  loggedInUserData : Customer = new Customer();

  constructor(private http: HttpClient) { 
    const loginUser = localStorage.getItem(Constant.LOCAL_KEY);
    if(loginUser != null){
      const parseObj = JSON.parse(loginUser);
      this.loggedInUserData = parseObj;
    }
  }

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
  

  addToCart(obj : CartModel){
    const url = `${this.apiUrl}AddToCart`;//template literal
    return this.http.post<ApiResponseModel>(url, obj);
  }

  getProductsByCustomerId(customerId: number){
    const url = `${this.apiUrl}GetCartProductsByCustomerId?id=${customerId}`;//template literal
    return this.http.get<ApiResponseModel>(url);
  }

  deleteProductFromCartById(cartId: number){
    const url = `${this.apiUrl}DeleteProductFromCartById?id=${cartId}`;//template literal
    return this.http.get<ApiResponseModel>(url);
  }

  placeOrder(obj : OrderModel){
    const url = `${this.apiUrl}PlaceOrder`;//template literal
    return this.http.post<ApiResponseModel>(url, obj);
  }

  getAllSaleByCustomerId(customerId : number){
    const url = `${this.apiUrl}GetAllSaleByCustomerId?id=${customerId}`;//template literal
    return this.http.get<ApiResponseModel>(url);
  }
}
