import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { DeepArtService } from './deep-art.service';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../service/api.service';

declare var Stripe: any;
// var stripe = Stripe('pk_test_TNUkeq3rB4LZ9BIcutvwwYpZ00vty1zMHH');
var stripe = Stripe('pk_test_ZJpMy2snhLEbZ9kLRO4DuZli00FVeCCXfS');
declare var paypal: any;
var FUNDING_SOURCES = [ paypal.FUNDING.PAYPAL ];
declare var $:any;

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
  idealClientSecret: any;

  styles: any = [];
  styleSelected: string;
  base64ConvertedImg: string;
  submissionId: String;
  imgUrl: string;
  hideUploadBtn: boolean = true;
  error: boolean = false;
  timer: any;
  accessToken: string;

  /** pwinty variable declaration below */
  orderId: any;

  /** paypal config */
  addScript: boolean = false;
  finalAmount: number = 1;
  paypalArray: any = [];

  /** stripe variable declaration */
  clientSecret:any;

  constructor(
    private _deepArt: DeepArtService,
    private _apiService:ApiService,
    ) { }

  ngOnInit() { 
    this.getCardPayment();
    this.idealpayment();
  
  }

  ngAfterViewInit() {
    this._deepArt.getAllStyles().subscribe(res => {
      if (res.styles && res.styles.length > 0) {
        this.styles = res.styles;
        this.styleSelected = res.styles[0].id;
      }
    });

   
    // paypal payment integration
    paypal.Buttons({
      createOrder: function (data, actions) {
        // This function sets up the details of the transaction, including the amount and line item details.
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: '0.01',
              }
            }
          ]
        });
      },
      onApprove: function (data, actions) {
        // This function captures the funds from the transaction.
        return actions.order.capture().then(function (details) {
          // This function shows a transaction success message to your buyer.
          alert('Transaction completed by ' + details.payer.name.given_name);
          // Call your server to save the transaction
        });
      }
    });
    FUNDING_SOURCES.forEach(function(fundingSource) {
      
          // Initialize the buttons
          var button = paypal.Buttons({
              fundingSource: fundingSource
          });
      
          // Check if the button is eligible
          if (button.isEligible()) {
      
              // Render the standalone button for that funding source
              button.render('#paypalForPayment');
          }
      });

    this._deepArt.getAccessTokenForPaypal().subscribe(res => {
      if (res.access_token) {
        this.accessToken = res.access_token;
        this.paypalArray = res.scope.split(' ');
        // console.log(this.paypalArray);
        // console.log(this.accessToken);
      }
    }, error => {
    })
  }

  /** deepArtImg */
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
  /** order picture */
  getInvoicesFromPaypal() {
    this._deepArt.getInvoices(this.accessToken).subscribe(res => {
      console.log(res);
    })
  }

  /** order Picture  */
  orderItem() {
    this._deepArt.createOrder().subscribe(res => {
      this.orderId = res.data.id;
      if (this.orderId) {
        this._deepArt.addImage(this.orderId).subscribe(response => {
          console.log(response);
        })
      }
    });


  }
  submitOrder() {
    if (this.orderId) {
      this._deepArt.checkOrder(this.orderId).subscribe(response => {
        console.log(response);
      })
      this._deepArt.orderStatus(this.orderId).subscribe(response => {
        console.log(response);
      })
    }
  }

  /** ideal payment */

  getPaymentIntent(){
    this._apiService.getPaymentIntent().subscribe(res=>{
      if(res.paymentIntent && res.paymentIntent.client_secret) this.clientSecret = res.paymentIntent.client_secret;
    })
  }
  getCardPayment(){
    this.getPaymentIntent(); 
    var elements = stripe.elements();    
    var style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };
    
    var card = elements.create("card", { style: style });
    card.mount("#card-element");
    card.addEventListener('change', ({error}) => {
      const displayError = document.getElementById('card-errors');
      if (error) {
        displayError.textContent = error.message;
      } else {
        displayError.textContent = '';
      }
    });
    var form = document.getElementById('payment-form');
    let that = this;
    form.addEventListener('submit', function(ev) {
      ev.preventDefault();
      stripe.confirmCardPayment(that.clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: 'Jenny Rosen'
          }
        }
      }).then(function(result) {
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          console.log(result.error.message);
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
          }
        }
      });
    });
  }

  // ideal payment intent

  getIdealPaymentIntent(){
    this._apiService.getIdealPaymentIntent().subscribe(res=>{
      if(res.paymentIntent && res.paymentIntent.client_secret)
        {
          this.idealClientSecret = res.paymentIntent.client_secret;
          console.log(this.idealClientSecret);
        }
    })
  }
  idealpayment() {
    this.getIdealPaymentIntent();
    var elements = stripe.elements();
    var options = {
      // Custom styling can be passed to options when creating an Element
      style: {
        base: {
          padding: '0',
          color: '#32325d',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4'
          },
        },
      },
    };
    // Create an instance of the idealBank Element
    var idealBank = elements.create('idealBank', options);

    // Add an instance of the idealBank Element into
    idealBank.mount('#ideal-bank-element');
    idealBank.on('change', function(event) {
      const bank = event.value;
      // Perform any additional logic here...
    });
    var form = document.getElementById('ideal-payment-form');
    var accountholderName = document.getElementById('accountholder-name');
    
    let that = this;
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      // Redirects away from the client
      stripe.confirmIdealPayment(
        that.idealClientSecret,
        {
          payment_method: {
            ideal: idealBank,
            billing_details: {
              name: 'abcd',
            },
          },
          return_url: 'http://localhost:4200/poc',
        }
      );
    });
  }

}
