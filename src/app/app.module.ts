import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { OwlModule } from 'ngx-owl-carousel';
import { StoreModule } from '@ngrx/store';
import { FormsModule }   from '@angular/forms';

/** service import */

import { RouteClass } from './app.route';
import { DeepArtService } from './component/print-img/deep-art.service';
import { ApiService } from './service/api.service';

/** reducer import */

import { filterReducer } from './store/reducer/filter.reducer';
import { printReducer } from './store/reducer/print.reducer';
import { imgReducer } from './store/reducer/image.reducer';
import { addressReducer } from './store/reducer/address.reducer';
import { checkoutReducer } from './store/reducer/checkout.reducer';
import { basketReducer } from './store/reducer/basket.reducer';

/** component import */

import { PaymentModalComponent } from './component/payment-modal/payment-modal.component';
import { FiltersComponent } from './component/filters/filters.component';
import { PrintCatalogComponent } from './component/print-catalog/print-catalog.component';
import { MyBasketComponent } from './component/my-basket/my-basket.component';
import { AddressComponent } from './component/address/address.component';
import { AppComponent } from './app.component';
import { PrintImgComponent } from './component/print-img/print-img.component';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { CheckoutComponent } from './component/checkout/checkout.component';

/** reducer */
let reducer = {
  filterReducer:filterReducer,
  printReducer: printReducer,
  imgReducer: imgReducer,
  addressReducer: addressReducer,
  checkoutReducer: checkoutReducer,
  basketReducer: basketReducer
};

@NgModule({
  declarations: [
    AppComponent,
    PrintImgComponent,
    HomeComponent,
    HeaderComponent,
    PaymentModalComponent,
    FiltersComponent,
    PrintCatalogComponent,
    MyBasketComponent,
    AddressComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    RouteClass,
    HttpClientModule,
    OwlModule,
    StoreModule.forRoot(reducer),
    FormsModule
  ],
  providers: [DeepArtService, ApiService],
  bootstrap: [AppComponent],
  entryComponents:[PaymentModalComponent]
})
export class AppModule {
  constructor(){}
 }
