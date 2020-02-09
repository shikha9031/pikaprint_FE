import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const baseUrl = 'https://api.deeparteffects.com/v1/noauth/';
const kiteBaseurl = "https://api.kite.ly/v4.0/";
const paypalBaseUrl = "https://api.sandbox.paypal.com/";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': 'WN9DNcxcp34pNebyffgZL3OerSfweX0x1qsNxS3d',
  })
};

  
@Injectable()
export class DeepArtService {

  constructor(private http: HttpClient) { }

  getAllStyles(){
    return this.http.get<any>(baseUrl + 'styles', httpOptions).pipe();
  }
  postImg(param){
    return this.http.post<any>(baseUrl + 'upload', param , httpOptions).pipe();    
  }
  getImg(param){
    const httpOptionsFoImgUrl = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-api-key': 'WN9DNcxcp34pNebyffgZL3OerSfweX0x1qsNxS3d',
      }),
      params: {'submissionId': param}
    };
    return this.http.get<any>(baseUrl + 'result', httpOptionsFoImgUrl).pipe();        
  }
  
  getPaymentStatus(){
    let paypalHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ',
      })
    }
    return this.http.get<any>(paypalBaseUrl + 'payment-experience/web-profiles/XP-8YTH-NNP3-WSVN-3C76', paypalHeader).pipe();            
  }

  getAccessTokenForPaypal(){
    const params = new HttpParams({
      fromObject: {
        grant_type: 'client_credentials'
      }
    });
    let Username='ASTSWXrbooRDiJsjaHN90V8_4gec92mpV1TWw0os2GTcp233P6AsoQXNB5dIDxKGd0TPictbUuvfyzUS';
    let Password='EBkroIzENvIalnLf9p2uOtTlgIgrXPcXDdsOdSI-1KuLX5pfI3lQ7tcmi_oaAFP8QEqrP171q9oGogM5';
    let authorizationData = 'Basic ' + btoa(Username + ':' + Password);
    let paypalHeader = {
        headers: new HttpHeaders({
          'Content-Type': 'x-www-form-urlencoded',
          'Authorization': authorizationData
        })
      }
    return this.http.post<any>(paypalBaseUrl + 'v1/oauth2/token/', params, paypalHeader).pipe();                
  }
  
  getOrderId(authorizationToken, orderId){
    let paypalHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authorizationToken
      })
    }
    return this.http.get<any>(paypalBaseUrl + 'v2/checkout/orders/'+orderId, paypalHeader).pipe();                
  }
}
