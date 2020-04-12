import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as filterRef from '../../store/action/filter.action'; 
import * as printRef from '../../store/action/print.action';
import * as imgUploadRef from '../../store/action/image.action';
import * as basketRef from '../../store/action/basket.action';
import * as menuRef from '../../store/action/menu.action';

import { UploadImage } from '../../interface/img';
import { Filter } from '../../interface/filter';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /** menu variable declaration */
  imageClick:boolean = true;
  filterClick:boolean = false;
  printClick:boolean = false;

  constructor( private _store:Store<any> ) { }

  ngOnInit() {
    this._store.select('imgReducer').subscribe((res:UploadImage)=>{
      if(res){
        this.imageClick = res.openTab;
      }
    })
    this._store.select('filterReducer').subscribe((res:Filter)=>{
      if(res) this.filterClick = res.showFilter;
    })
  }

  uploadImage(){
    this.imageClick = true;
    this.filterClick = false;
    this.printClick = false;
    this._store.dispatch(new imgUploadRef.ImgTabOpen(true));        
    this._store.dispatch(new filterRef.FilterOptionsToggle(false));    
    this._store.dispatch(new printRef.PrintImgSectionToggle(false));
  }
  filterImage(){
    this.filterClick = true;
    this.imageClick = false;
    this.printClick = false;
    this._store.dispatch(new imgUploadRef.ImgTabOpen(false));            
    this._store.dispatch(new filterRef.FilterOptionsToggle(true));
    this._store.dispatch(new printRef.PrintImgSectionToggle(false));    
  }
  printImg(){
    this.printClick = true;
    this.filterClick = false;
    this.imageClick = false;   
    this._store.dispatch(new imgUploadRef.ImgTabOpen(false));                
    this._store.dispatch(new filterRef.FilterOptionsToggle(false));    
    this._store.dispatch(new printRef.PrintImgSectionToggle(true));    
  }
  openCart(){
    this._store.dispatch(new basketRef.OpenCart(true));
  }
  openMenu(){
    this._store.dispatch(new menuRef.OpenSideMenu(true));
  }
}
