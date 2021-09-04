import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Print } from '../../interface/print';
import { UploadImage } from "../../interface/img";

@Component({
  selector: 'mobile-home',
  templateUrl: './mobile-home.component.html',
  styleUrls: ['./mobile-home.component.scss']
})
export class MobileHomeComponent implements OnInit {
  uploadImg: boolean;
  printImgUrl: string;

  constructor(private _store: Store<any>) { }

  ngOnInit() {
    this._store.select('printReducer').subscribe((res: Print) => {
      if (res) {
        this.printImgUrl = res.imgUrl;
      }
    })
    this._store.select('imgReducer').subscribe((res: UploadImage) => {
      if (res) {
        this.uploadImg = res.openTab;
      }
    })
  }

}
