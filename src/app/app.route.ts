import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PrintImgComponent } from './print-img/print-img.component';

let route: Routes = [
  { path: '', redirectTo:'home', pathMatch: 'full' },
  { path: 'home', component: PrintImgComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(route)
  ],
  declarations: [],
  exports:[RouterModule]
})
export class RouteClass { }
