export interface ApiResponseModel {
  "message": string,
  "result": boolean,
  "data": any
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

  constructor() {
    this.custId = 0;
    this.name = "";
    this.mobileNo = "";
    this.password = "";
  }
}

export class Login {
  userName: string;
  userPassword: string;

  constructor() {
    this.userName = "";
    this.userPassword = "";
  }
}

export class CartModel {
  cartId: number
  custId: number
  productId: number
  quantity: number
  addedDate: Date;

  constructor() {
    this.cartId = 0;
    this.custId = 0;
    this.productId = 0;
    this.quantity = 1;
    this.addedDate = new Date();
  }
}

export class CartProductByCustomer {
  cartId: number
  custId: number
  productId: number
  quantity: number
  productShortName: string
  addedDate: string
  productName: string
  categoryName: string
  productImageUrl: string
  productPrice: number

  constructor() {
    this.cartId = 0;
    this.custId = 0;
    this.productId = 0;
    this.quantity = 0;
    this.productName = '';
    this.productShortName = '';
    this.addedDate = '';
    this.categoryName = '';
    this.productImageUrl = '';
    this.productPrice = 0;
  }
}

export class OrderModel {
  saleId: number
  custId: number
  saleDate: Date
  totalInvoiceAmount: number
  discount: number
  paymentNaration: string
  deliveryAddress1: string
  deliveryAddress2: string
  deliveryCity: string
  deliveryPinCode: string
  deliveryLandMark: string
  isCanceled: boolean

  constructor() {
    this.saleId = 0;
    this.custId = 0;
    this.saleDate = new Date();
    this.totalInvoiceAmount = 0;
    this.discount = 0;
    this.paymentNaration = '';
    this.deliveryAddress1 = '';
    this.deliveryAddress2 = '';
    this.deliveryCity = '';
    this.deliveryPinCode = '';
    this.deliveryLandMark = '';
    this.isCanceled = false;
  }
}

