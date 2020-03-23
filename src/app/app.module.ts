import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { OwlModule } from 'ngx-owl-carousel';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { PrintImgComponent } from './component/print-img/print-img.component';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/header/header.component';

/** service import */

import { RouteClass } from './app.route';
import { DeepArtService } from './component/print-img/deep-art.service';
import { ApiService } from './service/api.service';
import { PaymentModalComponent } from './component/payment-modal/payment-modal.component';
import { FiltersComponent } from './component/filters/filters.component';
import { PrintCatalogComponent } from './component/print-catalog/print-catalog.component';

/** reducer import */

import { filterReducer } from './store/reducer/filter.reducer';
import { printReducer } from './store/reducer/print.reducer';

/** reducer */
let reducer = {
  filterReducer:filterReducer,
  printReducer: printReducer
};

@NgModule({
  declarations: [
    AppComponent,
    PrintImgComponent,
    HomeComponent,
    HeaderComponent,
    PaymentModalComponent,
    FiltersComponent,
    PrintCatalogComponent
  ],
  imports: [
    BrowserModule,
    RouteClass,
    HttpClientModule,
    OwlModule,
    StoreModule.forRoot(reducer)
  ],
  providers: [DeepArtService, ApiService],
  bootstrap: [AppComponent],
  entryComponents:[PaymentModalComponent]
})
export class AppModule {
  constructor(){}
 }
