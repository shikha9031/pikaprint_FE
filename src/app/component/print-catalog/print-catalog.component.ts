import { Component, OnInit } from '@angular/core';
import { Print } from '../../interface/print';
import { Store } from '@ngrx/store';
import * as printImgRef from '../../store/action/print.action';

@Component({
  selector: 'print-catalog',
  templateUrl: './print-catalog.component.html',
  styleUrls: ['./print-catalog.component.scss']
})
export class PrintCatalogComponent implements OnInit {

  prints = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
  printObj:Print;
  selectedIndex:number = -1;

  constructor(private _store:Store<any>) { }

  ngOnInit() {
     this._store.select('printReducer').subscribe((res:Print)=>{
        if(res){
           this.printObj = res;
        }
     })
  }
  selectItem(index){
    this.selectedIndex = index;
    this._store.dispatch(new printImgRef.SelectedPrintType(''));
  }

}
