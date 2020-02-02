import { Component, OnInit } from '@angular/core';
import { DeepArtService } from './deep-art.service';

//declare var apigClientFactory: any;

// var deepArtEffectsClient = apigClientFactory.newClient({
//   apiKey: 'WN9DNcxcp34pNebyffgZL3OerSfweX0x1qsNxS3d',
//   accessKey: 'AKIA3XE3HF7ST7YVWIEA',
//   secretKey: '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'
// });

@Component({
  selector: 'app-print-img',
  templateUrl: './print-img.component.html',
  styleUrls: ['./print-img.component.scss']
})
export class PrintImgComponent implements OnInit {

  styles: any = [];
  styleSelected: string;
  base64ConvertedImg: string;
  submissionId:String; 
  imgUrl:string;

  constructor(private _deepArt:DeepArtService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this._deepArt.getAllStyles().subscribe(res=>{
      if(res.styles && res.styles.length>0){
        this.styles = res.styles;
        this.styleSelected = res.styles[0].id;        
      }
    })


  }
  uploadImg(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    let that = this;

    reader.onloadend = function () {
      that.base64ConvertedImg = reader.result;     
    };

    reader.readAsDataURL(file);

  }
  chooseStyle(param) {
    this.styleSelected = param.target.value;
  }
  getSubmissionId(){
    if(this.base64ConvertedImg){
      let params = {
        "styleId": this.styleSelected,
        "imageBase64Encoded":this.base64ConvertedImg.substring((this.base64ConvertedImg.indexOf(',')+1), this.base64ConvertedImg.length)
      }; 
      this._deepArt.postImg(params).subscribe(res=>{
        if(res.submissionId){
          this.submissionId = res.submissionId;
          this.getPrintedImgUrl(this.submissionId);
        }
      },error=>{
         console.log(error);
      })
    }
    
  }
  getPrintedImgUrl(param){
    if(param){
      this._deepArt.getImg(param).subscribe(res=>{
        if(res.status === 'new' || res.status === 'processing'){
          this.getPrintedImgUrl(param);
        }
        else if(res.status === 'finished'){
          if(res.url){
            this.imgUrl = res.url;
          }
        }
        console.log(res);
      },error=>{
         console.log(error);
      })
    }
  }
}
