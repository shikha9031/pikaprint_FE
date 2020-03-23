import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as filterRef from '../../store/action/filter.action'; 
import * as printRef from '../../store/action/print.action';

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

  ngOnInit() {}

  uploadImage(){
    this.imageClick = true;
    this.filterClick = false;
    this.printClick = false;
    this._store.dispatch(new filterRef.FilterOptionsToggle(false));    
    this._store.dispatch(new printRef.PrintImgSectionToggle(false));
  }
  filterImage(){
    this.filterClick = true;
    this.imageClick = false;
    this.printClick = false;
    this._store.dispatch(new filterRef.FilterOptionsToggle(true));
    this._store.dispatch(new printRef.PrintImgSectionToggle(false));    
  }
  printImg(){
    this.printClick = true;
    this.filterClick = false;
    this.imageClick = false;    
    this._store.dispatch(new filterRef.FilterOptionsToggle(false));    
    this._store.dispatch(new printRef.PrintImgSectionToggle(true));    
  }
}
