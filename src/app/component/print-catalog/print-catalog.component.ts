import { Component, OnInit } from '@angular/core';
import { Print } from '../../interface/print';
import { Store } from '@ngrx/store';

@Component({
  selector: 'print-catalog',
  templateUrl: './print-catalog.component.html',
  styleUrls: ['./print-catalog.component.scss']
})
export class PrintCatalogComponent implements OnInit {

  prints = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
  printObj:Print;

  constructor(private _store:Store<any>) { }

  ngOnInit() {
     this._store.select('printReducer').subscribe((res:Print)=>{
        if(res){
           this.printObj = res;
        }
     })
  }

}
