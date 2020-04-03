import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as checkoutRef from '../../store/action/checkout.action';
import { Checkout } from '../../interface/checkout';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  
  creditCardSelected:boolean = false;
  constructor(private _store:Store<any>) { }

  ngOnInit() {
  }
  closeCheckoutForm(){
      this._store.dispatch(new checkoutRef.CheckoutFormClose(false));
  }
  closeCreditCardForm(){
    this.creditCardSelected = false;    
  }
}
