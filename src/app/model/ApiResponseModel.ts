export interface ApiResponseModel {
    "message" : string,
    "result" : boolean,
    "data" : any
}

export interface IProduct {
    productId: number
    productSku: string
    productName: string
    productPrice: number
    productShortName: string
    productDescription: string
    createdDate: string
    deliveryTimeSpan: string
    categoryId: number
    productImageUrl: string
    categoryName: string
  }

  export interface ICategory {
    categoryId: number
    categoryName: string
    parentCategoryId: number
    userId: number
  }

export class Customer {
  custId: number;
  name: string;
  mobileNo: string;
  password: string;

  constructor(){
    this.custId = 0;
    this.name = "";
    this.mobileNo = "";
    this.password = "";
  }
}

export class Login {
  userName: string;
  userPassword: string;

  constructor(){
    this.userName = "";
    this.userPassword = "";
  }
}
  