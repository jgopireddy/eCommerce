import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { ApiResponseModel, OrderModel } from '../../model/ApiResponseModel';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit{
  
  masterService = inject(MasterService);
  orderList : OrderModel[] = [];

  ngOnInit(): void {
   this.getAllSaleByCustomerId();
  }

  getAllSaleByCustomerId(){
    this.masterService.getAllSaleByCustomerId(this.masterService.loggedInUserData.custId).subscribe((resp:ApiResponseModel) => {
      this.orderList = resp.data;
    })
  }


}
