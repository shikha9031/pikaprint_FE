import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as addressRef from '../../store/action/address.action';
import { Address } from '../../interface/address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  showMore:boolean = false;
  addressFormObj:Address;

  constructor(private _store:Store<any>) { }

  ngOnInit() {
    this.addressFormObj = {
      firstname:'',
      email:'',
      phone_number:'',
      Streetname:'',
      apartment:'',
      building:'',
      floor:'',
      city:'',
      pincode:'',
      country:'',
    }
  }
  showMoreFeilds(){
    this.showMore = !this.showMore;
  }
  closeAddForm(){
    this._store.dispatch(new addressRef.CloseAddress(true));
  }
  submitForm(){
    this._store.dispatch(new addressRef.AddressFormData(this.addressFormObj)); 
    this._store.dispatch(new addressRef.CloseAddress(true));    
  }
}
