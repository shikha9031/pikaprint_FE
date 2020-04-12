import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Print } from '../../interface/print';
import { Address, AddressForm } from '../../interface/address';
import { Checkout } from '../../interface/checkout';
import { Basket } from '../../interface/basket';

import * as checkoutRef from '../../store/action/checkout.action';
import * as basketRef from '../../store/action/basket.action';

@Component({
  selector: 'my-basket',
  templateUrl: './my-basket.component.html',
  styleUrls: ['./my-basket.component.scss']
})
export class MyBasketComponent implements OnInit {
  openCart: boolean;
  closeAddForm: boolean = true;
  printFrameurl: string;
  printImgUrl: string;
  addressFormObj: Address;
  shippingType: string = 'standard';
  checkout: boolean = false;

  constructor(private _store: Store<any>) { }

  ngOnInit() {
    this.addressFormObj = {
      name: '',
      email: '',
      phone_number: '',
      Streetname: '',
      apartment: '',
      building: '',
      floor: '',
      city: '',
      pincode: '',
      country: '',
    }

    this._store.select('printReducer').subscribe((res: Print) => {
      if (res) {
        this.printFrameurl = res.printFrameURl;
        this.printImgUrl = res.imgUrl;
      }
    })
    this._store.select('addressReducer').subscribe((res: AddressForm) => {
      if (res) {
        this.closeAddForm = res.closeAddForm;
        this.addressFormObj = res.addFormObj;
      }
    })
    this._store.select('checkoutReducer').subscribe((res: Checkout) => {
      if (res) {
        this.checkout = res.closeCheckoutPage;
      }
    })
    this._store.select('basketReducer').subscribe((res: Basket) => {
      if (res) {
        this.openCart = res.openBasket;
      }
    })
  }

  addAddressFunc() {
    this.closeAddForm = false;
  }
  radioBtnOption(param) {
    this.shippingType = param;
  }
  checkoutFun() {
    if (this.addressFormObj.email) {
      this.checkout = true;
      this._store.dispatch(new checkoutRef.CheckoutFormClose(true));
    }
  }

  close() {
    this._store.dispatch(new basketRef.OpenCart(false));
  }
  closeSideNav(event) {
    this.openCart = false;
  }
}
