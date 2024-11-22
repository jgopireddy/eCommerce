import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { ApiResponseModel, CartProductByCustomer, OrderModel } from '../../model/ApiResponseModel';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css'
})
export class CreateOrderComponent implements OnInit{

  masterService = inject(MasterService);
  cartProductList : CartProductByCustomer[] = [];
  totalCartAmount : number = 0;
  orderObj : OrderModel = new OrderModel();
  router = inject(Router);

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems(){
    if(this.masterService.loggedInUserData != null){
      this.masterService.getProductsByCustomerId(this.masterService.loggedInUserData.custId).subscribe((result : ApiResponseModel) => {
        if(result.result){
          this.cartProductList = result.data;
          this.totalCartAmount = this.cartProductList.reduce((c, s) => c + s.productPrice, 0);
        }else{
          alert(result.message);
        }
      })
    }
  }

  placeOrder(){
    this.orderObj.custId = this.masterService.loggedInUserData.custId;
    this.orderObj.totalInvoiceAmount = this.totalCartAmount;
    

    this.masterService.placeOrder(this.orderObj).subscribe((resp: ApiResponseModel) => {
      alert(resp.message);
      if(resp.result){
        this.getCartItems();
        this.orderObj = new OrderModel();
        this.router.navigateByUrl("/home");
      }
    })
  }
}
