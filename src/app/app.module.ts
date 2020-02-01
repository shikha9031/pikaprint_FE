import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrintImgComponent } from './print-img/print-img.component';

import { RouteClass } from './app.route';
import { HttpClientModule } from '@angular/common/http';

import { DeepArtService } from './print-img/deep-art.service';

@NgModule({
  declarations: [
    AppComponent,
    PrintImgComponent
  ],
  imports: [
    BrowserModule,
    RouteClass,
    HttpClientModule
  ],
  providers: [DeepArtService],
  bootstrap: [AppComponent]
})
export class AppModule { }
