import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { OwlModule } from 'ngx-owl-carousel';
import { StoreModule } from '@ngrx/store';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';

/** service import */

import { RouteClass } from './app.route';
import { DeepArtService } from './component/print-img/deep-art.service';
import { ApiService } from './service/api.service';
import { PhotoEditingService } from './service/photo-editing.service';

/** reducer import */

import { filterReducer } from './store/reducer/filter.reducer';
import { printReducer } from './store/reducer/print.reducer';
import { imgReducer } from './store/reducer/image.reducer';
import { addressReducer } from './store/reducer/address.reducer';
import { checkoutReducer } from './store/reducer/checkout.reducer';
import { basketReducer } from './store/reducer/basket.reducer';
import { menuReducer } from './store/reducer/menu.reducer';
import { commonReducer } from './store/reducer/common.reducer';

/** directive import */
import{ ClickOutsideDirective } from './directives/clickoutside.directive';

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
import { LeftNavComponent } from './component/left-nav/left-nav.component';
import { UserComponent } from './component/user/user.component';
import { FeedbackComponent } from './component/feedback/feedback.component';
import { AboutUsComponent } from './component/about-us/about-us.component';

/** reducer */
let reducer = {
  filterReducer:filterReducer,
  printReducer: printReducer,
  imgReducer: imgReducer,
  addressReducer: addressReducer,
  checkoutReducer: checkoutReducer,
  basketReducer: basketReducer,
  menuReducer: menuReducer,
  commonReducer: commonReducer
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
    CheckoutComponent,
    ClickOutsideDirective,
    LeftNavComponent,
    UserComponent,
    FeedbackComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    RouteClass,
    HttpClientModule,
    OwlModule,
    StoreModule.forRoot(reducer),
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ToastrModule.forRoot()    
  ],
  providers: [DeepArtService, ApiService, PhotoEditingService],
  bootstrap: [AppComponent],
  entryComponents:[UserComponent]
})
export class AppModule {
  constructor(){}
 }
