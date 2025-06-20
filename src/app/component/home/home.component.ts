import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as filterRef from '../../store/action/filter.action';
import * as imgUploadRef from '../../store/action/image.action';
import * as printRef from '../../store/action/print.action';

import { Filter } from '../../interface/filter';
import { UploadImage } from '../../interface/img';
import { Print } from '../../interface/print';

import { PhotoEditingService } from '../../service/photo-editing.service';

import * as CryptoJS from 'crypto-js';
declare var $: any;
declare var window: any;

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
  printImgUrl: string;
  imgArray: any = [];
  uploadImgContainer: boolean = true;
  timer: any;

  constructor(private _store: Store<any>, private _photoEditingService: PhotoEditingService) { }

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
    this._store.select('filterReducer').subscribe((res: Filter) => {
      if (res) this.filterClick = res.showFilter;
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
  uploadImgFun() {
    this.imageSrc = '';
    this.uploadImgContainer = true;
  }

  callphoService() {
    let parser = new DOMParser();

    let app_id = '74c239ff38602894b52e3f546403b995';
    let KEY = '75adf80e47e5a340e5cf069d294a9899';
    let DATA = `<image_process_call>
    <image_url order="1">https://firebasestorage.googleapis.com/v0/b/pikaprint-22450.appspot.com/o/babu.jpeg?alt=media&token=5e890ac4-d807-4391-95de-b9a312684762</image_url>
    <methods_list>
    <method order="1">
    <name>split_toning</name>
    <params>desaturate=0;balance=48;shadow_hue=222;highlight_hue=44;shadow_saturation=100;highlight_saturation=94</params>    
    </method>
    </methods_list>
    <result_size>2000</result_size>
    <result_quality>90</result_quality>
    <template_watermark>true</template_watermark>
    <lang>en</lang>
    <abort_methods_chain_on_error>true</abort_methods_chain_on_error>
    </image_process_call>`;

    let hash = (CryptoJS.HmacSHA1(DATA, KEY)).toString();

    let body = new URLSearchParams();
    body.set('data', DATA);
    body.set('sign_data', hash);
    body.set('app_id', app_id);

    this._photoEditingService.editPhoto(body).subscribe((res: any) => {
      if (res) {
        let xmlDoc = parser.parseFromString(res, "text/xml");
        let requestID = xmlDoc.getElementsByTagName("request_id")[0].childNodes[0].nodeValue;
        this.getRequestedImg(requestID);
      }
    }, error => {
      console.log(error);
    })

  }

  getRequestedImg(requestID) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this._photoEditingService.getResultRequest(requestID).subscribe(res => {
        if (res) {
          let parser = new DOMParser();
          let xmlDoc = parser.parseFromString(res, "text/xml");
          let status = xmlDoc.getElementsByTagName("status")[0].childNodes[0].nodeValue;
          let newRequestID = xmlDoc.getElementsByTagName("request_id")[0].childNodes[0].nodeValue;
          if (status === 'InProgress') {
            this.getRequestedImg(newRequestID);
          }
        }
      }, error => {
        console.log(error);
      })
    }, 500)

  }

  StringToXML(oString) {
    //code for IE
    if (window['ActiveXObject']) {
      var oXML = new window['ActiveXObject']("Microsoft.XMLDOM"); oXML.loadXML(oString);
      return oXML;
    }
    // code for Chrome, Safari, Firefox, Opera, etc. 
    else {
      return (new DOMParser()).parseFromString(oString, "text/xml");
    }
  }
  saveFile(uri) {
    var link = document.createElement("a");
    link.download = 'abc.jpg';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
