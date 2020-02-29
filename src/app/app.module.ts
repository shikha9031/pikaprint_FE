import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PrintImgComponent } from './component/print-img/print-img.component';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/header/header.component';

/** service import */

import { RouteClass } from './app.route';
import { DeepArtService } from './component/print-img/deep-art.service';
import { ApiService } from './service/api.service';
import { PaymentModalComponent } from './component/payment-modal/payment-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    PrintImgComponent,
    HomeComponent,
    HeaderComponent,
    PaymentModalComponent
  ],
  imports: [
    BrowserModule,
    RouteClass,
    HttpClientModule,
  ],
  providers: [DeepArtService, ApiService],
  bootstrap: [AppComponent],
  entryComponents:[PaymentModalComponent]
})
export class AppModule {
  constructor(){}
 }
