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

  constructor(private _deepArt:DeepArtService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this._deepArt.getAllStyles().subscribe(res=>{
      console.log(res);
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
    console.log(param.target.value);
  }
  getSubmissionId(){
    if(this.base64ConvertedImg){
      let params = {
        "styleId": this.styleSelected,
        "imageBase64Encoded":this.base64ConvertedImg.substring((this.base64ConvertedImg.indexOf(',')+1), this.base64ConvertedImg.length)
      }; 
      this._deepArt.postImg(params).subscribe(res=>{
        console.log("Successfully uploaded image");
        console.log("SubmissionId: " + res.submissionId);
        if(res.submissionId){
          this.getPrintedImgUrl(res.submissionId);
        }
      },error=>{
         console.log(error);
      })
    }
    
  }
  getPrintedImgUrl(param){
    console.log(param);
    this._deepArt.getImg(param).subscribe(res=>{
      console.log("Successfully uploaded image");
      console.log("SubmissionId: " + res)
    },error=>{
       console.log(error);
    })
  // deepArtEffectsClient.resultGet(params)
  // .then(function(result) {
  //   console.log("Successfully checked status");
  //   if(result.data.status=="finished") {
  //     console.log("URL for artwork: " + result.data.url)
  //   }
  // }).catch(function(result){
  //   console.log("Error checking status");
  // });
  }
}
