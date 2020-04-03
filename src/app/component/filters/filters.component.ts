import { Component, OnInit } from '@angular/core';
import * as filterRef from '../../store/action/filter.action';
import { Store } from '@ngrx/store';
import { Filter } from '../../interface/filter';

declare var $:any;

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  images = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
  selectedIndex: number = -1;
  filterObj:Filter;

  constructor(private _store:Store<any>) { }

  ngOnInit() {
    this._store.select('filterReducer').subscribe((res:Filter)=>{
      if(res){
        this.filterObj = res;
      }
    })
  }

  ngAfterViewInit(){
    $(document).ready(function(){
      $(".owl-carousel").owlCarousel({
        loop:true,
        margin:10,
        responsiveClass:true,
        nav: true,
        navText:['&#x27;','next&#x27;','&#x27;','prev&#x27;'],
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:3,
                nav:false
            },
            1000:{
                items:5,
                nav:true,
                loop:false
            }
        }
      });
    });  
   }
   selectItem(index){
    this.selectedIndex = index;
    this._store.dispatch(new filterRef.SelectFilterOptions(index));
   }
}
