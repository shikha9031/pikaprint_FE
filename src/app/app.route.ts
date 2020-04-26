import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PrintImgComponent } from './component/print-img/print-img.component';
import { HomeComponent } from './component/home/home.component';
import { AboutUsComponent } from './component/about-us/about-us.component';

let route: Routes = [
  { path: '', redirectTo:'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },  
  { path: 'poc', component: PrintImgComponent, pathMatch: 'full' }, 
  { path: 'about-us', component: AboutUsComponent, pathMatch: 'full' }  
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
