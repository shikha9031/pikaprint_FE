import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import * as filterRef from '../../store/action/filter.action';
import * as printRef from '../../store/action/print.action';
import * as imgUploadRef from '../../store/action/image.action';
import * as basketRef from '../../store/action/basket.action';
import * as menuRef from '../../store/action/menu.action';

import { UploadImage } from '../../interface/img';
import { Filter } from '../../interface/filter';

declare var $: any;

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  imageSrc: any;

  /** menu variable declaration */
  imageClick: boolean = true;
  filterClick: boolean = false;
  printClick: boolean = false;
  menuShow: boolean = true;
  showFooterMenu: boolean = false;

  constructor(private _store: Store<any>, private router: Router) { }

  ngOnInit() {

    this._store.select('imgReducer').subscribe((res: UploadImage) => {
      if (res) {
        this.imageClick = res.openTab;
      }
    })

    this._store.select('filterReducer').subscribe((res: Filter) => {
      if (res) this.filterClick = res.showFilter;
    })

    this._store.select('commonReducer').subscribe(res => {
      if (res) {
        this.menuShow = res.isMenuOpen;
      }
    })
  }

  uploadImage() {
    this.imageClick = true;
    this.filterClick = false;
    this.printClick = false;
    this.showFooterMenu = false;
    this._store.dispatch(new imgUploadRef.ImgTabOpen(true));
    this._store.dispatch(new filterRef.FilterOptionsToggle(false));
    this._store.dispatch(new printRef.PrintImgSectionToggle(false));
  }
  filterImage() {
    this.filterClick = true;
    this.imageClick = false;
    this.printClick = false;
    this._store.dispatch(new imgUploadRef.ImgTabOpen(false));
    this._store.dispatch(new filterRef.FilterOptionsToggle(true));
    this._store.dispatch(new printRef.PrintImgSectionToggle(false));
  }
  printImg() {
    this.printClick = true;
    this.filterClick = false;
    this.imageClick = false;
    this._store.dispatch(new imgUploadRef.ImgTabOpen(false));
    this._store.dispatch(new filterRef.FilterOptionsToggle(false));
    this._store.dispatch(new printRef.PrintImgSectionToggle(true));
  }
  openCart() {
    this._store.dispatch(new basketRef.OpenCart(true));
  }
  openMenu() {
    this._store.dispatch(new menuRef.OpenSideMenu(true));
  }
  
  uploadImgInMobile(){
    $("#fileInputInMobile").click();
  }
  selectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.imageSrc = reader.result;
        this._store.dispatch(new printRef.PrintImg(reader.result));
      }
      reader.readAsDataURL(file);
      this.showFooterMenu = true;
      this.filterImage();
      // this._store.dispatch(new filterRef.FilterOptionsToggle(true));
       this._store.dispatch(new imgUploadRef.ImgTabOpen(false));
    }
  }
}
