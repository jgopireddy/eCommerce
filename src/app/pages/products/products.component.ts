import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { ApiResponseModel, CartModel, Customer, ICategory, IProduct } from '../../model/ApiResponseModel';
import { map, Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Constant } from '../../constant/constant';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy{
  
  
  subscriptionList : Subscription[] = [];

  masterService = inject(MasterService);
  
  //productList : IProduct[] = [];
  productList = signal<IProduct[]>([]);
  

  categoyList$ : Observable<ICategory[]> = new Observable<ICategory[]>();

  ngOnInit(): void {
    this.loadAllProducts();
    this.loadAllCategory();
  }

  loadAllProducts(){
    this.subscriptionList.push(
      this.masterService.getAllProducts().subscribe((result : ApiResponseModel) => {
        //this.productList = result.data;
        this.productList.set(result.data);
      })
    );
  }

  loadAllCategory(){
    this.categoyList$ = this.masterService.getAllCategory().pipe(
      map(item => item.data)
    );
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach(element => {
      element.unsubscribe();
    });
  }

  getProductsByCategory(categoryId : number){
    this.subscriptionList.push(
      this.masterService.getAllProductsByCategoryId(categoryId).subscribe((result : ApiResponseModel) => {
        //this.productList = result.data;
        this.productList.set(result.data);
      })
    );
  }

  onAddToCart(productId: number){
    const cartObj : CartModel = new CartModel();
    cartObj.productId = productId;
    cartObj.custId = this.masterService.loggedInUserData.custId;
    this.subscriptionList.push(
      this.masterService.addToCart(cartObj).subscribe((result : ApiResponseModel) => {
        if(result.result){
          this.masterService.onCartAdd.next(true);
        }
        alert(result.message);
      })
    );
  }
}
