import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { DeepArtService } from './deep-art.service';

declare var paypal: any;
// declare var braintree:any;

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
  submissionId: String;
  imgUrl: string;
  hideUploadBtn: boolean = true;
  error: boolean = false;
  timer: any;
  orderId: string;
  accessToken: string;

  /** paypal config */
  addScript: boolean = false;
  finalAmount: number = 1;
 
  paypalArray: any = [];

  constructor(private _deepArt: DeepArtService) { }

  ngOnInit() { }
  ngAfterViewInit() {
    this._deepArt.getAllStyles().subscribe(res => {
      if (res.styles && res.styles.length > 0) {
        this.styles = res.styles;
        this.styleSelected = res.styles[0].id;
      }
    });

    this._deepArt.getAccessTokenForPaypal().subscribe(res=>{
      if(res.access_token)
        {
          this.accessToken = res.access_token;
          this.paypalArray = res.scope.split(' ');
          console.log(this.paypalArray[0]);
        }
    },error=>{
        console.log(error);
    })

    paypal.Buttons({
      createOrder: function (data, actions) {
        // This function sets up the details of the transaction, including the amount and line item details.
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '0.01'
            }
          }]
        });
      },
      onApprove: function (data, actions) {
        // This function captures the funds from the transaction.
        return actions.order.capture().then(function (details) {
          // This function shows a transaction success message to your buyer.
          console.log(details);
          console.log(data);
          alert('Transaction completed by ' + details.payer.name.given_name);
          // Call your server to save the transaction
          // return fetch('/paypal-transaction-complete', {
          //   method: 'post',
          //   headers: {
          //     'content-type': 'application/json'
          //   },
          //   body: JSON.stringify({
          //     orderID: data.orderID
          //   })
          // });
        });
      }
    }).render('#paypalForPayment');
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
  getSubmissionId() {
    this.hideUploadBtn = false;
    this.error = false;
    if (this.base64ConvertedImg) {
      let params = {
        "styleId": this.styleSelected,
        "imageBase64Encoded": this.base64ConvertedImg.substring((this.base64ConvertedImg.indexOf(',') + 1), this.base64ConvertedImg.length)
      };
      this._deepArt.postImg(params).subscribe(res => {
        if (res.submissionId) {
          this.submissionId = res.submissionId;
          this.getPrintedImgUrl(this.submissionId);
        }
      }, error => {
        console.log(error);
      })
    }

  }
  getPrintedImgUrl(param) {
    if (param) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this._deepArt.getImg(param).subscribe(res => {
          if (res.status === 'new' || res.status === 'processing') {
            this.getPrintedImgUrl(param);
          }
          else if (res.status === 'finished') {
            if (res.url) {
              this.imgUrl = res.url;
              this.hideUploadBtn = true;
            }
          }
        }, error => {
          this.hideUploadBtn = true;
          this.error = true;
          console.log(error);
        })
      }, 500)

    }
  }
}
