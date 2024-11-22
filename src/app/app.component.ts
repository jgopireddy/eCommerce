import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ApiResponseModel, CartProductByCustomer, Customer, Login } from './model/ApiResponseModel';
import { FormsModule } from '@angular/forms';
import { MasterService } from './service/master.service';
import { Constant } from './constant/constant';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  title = 'eCommerce';

  registeredObj : Customer = new Customer();
  loginObj : Login = new Login();

  

  @ViewChild("registerModel") registerModel : ElementRef | undefined;
  @ViewChild("loginModel") loginModel : ElementRef | undefined;
  isCartPopupOpen: boolean = false;

  masterService = inject(MasterService);
  cartProductList : CartProductByCustomer[] = [];

  noOfCartItems : number = 0;
  cartTotal : number = 0;
  totalCartAmount : number = 0;
  totalQty : number = 0;

  ngOnInit(): void {
    const loginUser = localStorage.getItem(Constant.LOCAL_KEY);
    if(this.masterService.loggedInUserData != null){
      this.getCartItems();
    }
    this.masterService.onCartAdd.subscribe((res:boolean) => {
      if(res){
        this.getCartItems();
      }
    })
  }

  openRegisterModel(){
    if(this.registerModel){
      this.registerModel.nativeElement.style.display = "block";
    }
  }
  closeRegisterModel(){
    if(this.registerModel){
      this.registerModel.nativeElement.style.display = "none";
    }
  }

  openLoginModel(){
    if(this.loginModel){
      this.loginModel.nativeElement.style.display = "block";
    }
  }

  closeLoginModel(){
    if(this.loginModel){
      this.loginModel.nativeElement.style.display = "none";
    }
  }

  onRegister(){
    this.masterService.registerCustomer(this.registeredObj).subscribe((result : ApiResponseModel) => {
      alert(result.message);
      if(result.result){
        this.closeRegisterModel();
      }
    });
  }

  onLogin(){
    
    this.masterService.loginCustomer(this.loginObj).subscribe((result : ApiResponseModel) => {
      
      if(result.result){
        localStorage.setItem(Constant.LOCAL_KEY, JSON.stringify(result.data));
        this.closeLoginModel();
        this.masterService.loggedInUserData = result.data;
        this.getCartItems();
      }else{
        alert(result.message);
      }
    });
  }
  onLogout(){
    localStorage.removeItem(Constant.LOCAL_KEY);
    this.masterService.loggedInUserData = new Customer();
  }

  showCartDetails(){
    this.isCartPopupOpen = !this.isCartPopupOpen;
  }

  getCartItems(){
    if(this.masterService.loggedInUserData != null){
      this.masterService.getProductsByCustomerId(this.masterService.loggedInUserData.custId).subscribe((result : ApiResponseModel) => {
        if(result.result){
          this.cartProductList = result.data;
          this.totalCartAmount = this.cartProductList.reduce((s, c) => s + c.productPrice, 0);
          this.totalQty = this.cartProductList.reduce((s, c) => s + c.quantity, 0);
        }else{
          alert(result.message);
        }
      })
    }
  }
  onRemoveProduct(cartId : number){
    this.masterService.deleteProductFromCartById(cartId).subscribe((resp: ApiResponseModel) => {
      if(!resp.result){
        alert(resp.message);
      }else{
        this.getCartItems();
      }
    })
  }
}
