import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UploadImage } from '../../interface/img';
import { Print } from '../../interface/print';
import * as filterRef from '../../store/action/filter.action'; 
import * as imgUploadRef from '../../store/action/image.action';
import * as printRef from '../../store/action/print.action';
declare var $: any;
import { Filter } from '../../interface/filter';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showPrintOptions: boolean;
  filterClick: boolean;
  imageSrc: any;
  uploadImg: boolean = true;
  printFrameurl: string = '';
  showLoader: boolean = false;
  printImgUrl:string;
  imgArray : any = [];
  uploadImgContainer:boolean = true;

  constructor(private _store: Store<any>) { }

  ngOnInit() {
    this._store.select('imgReducer').subscribe((res: UploadImage) => {
      if (res) {
        this.uploadImg = res.openTab;
      }
    })
    this._store.select('printReducer').subscribe((res: Print) => {
      if (res) {
        this.printFrameurl = res.printFrameURl;
        this.showPrintOptions = res.showPrintOptions;
      }
    })
    this._store.select('filterReducer').subscribe((res:Filter)=>{
      if(res) this.filterClick = res.showFilter;
    })
  }
  move() {
    var elem = document.getElementById("progressBar");
    var width = 20;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++;
        elem.style.width = width + '%';
        elem.innerHTML = width * 1 + '%';
      }
    }
  };
  uploadImage() {
    $("#fileInput").click();
  }
  selectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.imageSrc = reader.result;
        this.printImgUrl = reader.result;
        this.uploadImgContainer = false;
        this.imgArray.push(reader.result);
        this._store.dispatch(new printRef.PrintImg(reader.result));         
      }
      reader.readAsDataURL(file);      
      this._store.dispatch(new filterRef.FilterOptionsToggle(true));      
      this._store.dispatch(new imgUploadRef.ImgTabOpen(false));  
    }
  }
  uploadImgFun(){
    this.imageSrc = '';
    this.uploadImgContainer = true;
  }

}
