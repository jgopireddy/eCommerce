import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiResponseModel, Customer, Login } from './model/ApiResponseModel';
import { FormsModule } from '@angular/forms';
import { MasterService } from './service/master.service';
import { Constant } from './constant/constant';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  title = 'eCommerce';

  registeredObj : Customer = new Customer();
  loginObj : Login = new Login();

  loggedInUserData : Customer = new Customer();

  @ViewChild("registerModel") registerModel : ElementRef | undefined;
  @ViewChild("loginModel") loginModel : ElementRef | undefined;

  masterService = inject(MasterService);

  ngOnInit(): void {
    const loginUser = localStorage.getItem(Constant.LOCAL_KEY);
    if(loginUser != null){
      const parseObj = JSON.parse(loginUser);
      this.loggedInUserData = parseObj;
    }
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
        this.loggedInUserData = result.data;
      }else{
        alert(result.message);
      }
    });
  }
  onLogout(){
    localStorage.removeItem(Constant.LOCAL_KEY);
    this.loggedInUserData = new Customer();
  }
}
