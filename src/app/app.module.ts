import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrintImgComponent } from './print-img/print-img.component';

import { RouteClass } from './app.route';

@NgModule({
  declarations: [
    AppComponent,
    PrintImgComponent
  ],
  imports: [
    BrowserModule,
    RouteClass
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
