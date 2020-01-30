import { Component, OnInit } from '@angular/core';
declare var apigClientFactory: any;

var deepArtEffectsClient = apigClientFactory.newClient({
  apiKey: 'WN9DNcxcp34pNebyffgZL3OerSfweX0x1qsNxS3d',
  accessKey: 'AKIA3XE3HF7ST7YVWIEA',
  secretKey: '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'
});

@Component({
  selector: 'app-print-img',
  templateUrl: './print-img.component.html',
  styleUrls: ['./print-img.component.scss']
})
export class PrintImgComponent implements OnInit {

  styles: any = [];
  styleSelected: string;
  base64ConvertedImg: string;

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    let that = this;
    deepArtEffectsClient.stylesGet()
      .then(function (result) {
        that.styles = result.data;
        this.styleSelected = that.styles[0];

      }).catch(function (result) {
        console.log("Error loading styles");
      });

  }
  uploadImg(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    let that = this;
    reader.onloadend = function () {
      that.base64ConvertedImg = reader.result;
    };
    reader.readAsDataURL(file);

    setTimeout(() => {
      let params = {
        styleId: this.styleSelected,
      };
      deepArtEffectsClient.uploadPost(params, this.base64ConvertedImg)
        .then(function (result) {
          console.log("Successfully uploaded image");
          console.log("SubmissionId: " + result.data.submissionId)
        }).catch(function (result) {
          console.log("Error uploading image");
        });
    }, 1000);

  }
  chooseStyle(param) {
    this.styleSelected = param;
    console.log(param.target.value);
  }
}
