import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { URLSearchParams } from "@angular/http";

const baseUrl = 'https://api.deeparteffects.com/v1/noauth/';
const pwintyBaseurl = "https://sandbox.pwinty.com/v3.0";
const paypalBaseUrl = "https://api.sandbox.paypal.com/";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': 'WN9DNcxcp34pNebyffgZL3OerSfweX0x1qsNxS3d',
  })
};

const pwintyApiOptions = {
  headers: new HttpHeaders({
    'X-Pwinty-MerchantId': 'e7d790c3-4b33-44b2-961f-239695145b83',
    'X-Pwinty-REST-API-Key': 'test_c7ee4d6b-1031-4e1f-8f41-2ba2cd03459f',
    'Content-Type': 'application/json'
  })
};


@Injectable()
export class DeepArtService {

  constructor(private http: HttpClient) { }

  getAllStyles() {
    return this.http.get<any>(baseUrl + 'styles', httpOptions).pipe();
  }
  postImg(param) {
    return this.http.post<any>(baseUrl + 'upload', param, httpOptions).pipe();
  }
  getImg(param) {
    const httpOptionsFoImgUrl = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-api-key': 'WN9DNcxcp34pNebyffgZL3OerSfweX0x1qsNxS3d',
      }),
      params: { 'submissionId': param }
    };
    return this.http.get<any>(baseUrl + 'result', httpOptionsFoImgUrl).pipe();
  }

  /** paypal coding Below */

  getPaymentStatus() {
    let paypalHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ',
      })
    }
    return this.http.get<any>(paypalBaseUrl + 'payment-experience/web-profiles/XP-8YTH-NNP3-WSVN-3C76', paypalHeader).pipe();
  }

  getAccessTokenForPaypal() {
    let username = 'ASTSWXrbooRDiJsjaHN90V8_4gec92mpV1TWw0os2GTcp233P6AsoQXNB5dIDxKGd0TPictbUuvfyzUS';
    let password = 'EBkroIzENvIalnLf9p2uOtTlgIgrXPcXDdsOdSI-1KuLX5pfI3lQ7tcmi_oaAFP8QEqrP171q9oGogM5';

    let authorizationData = 'Basic ' + btoa(username + ':' + password);
    let paypalHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': authorizationData,
        'Accept-Language': 'en_US'
      }),
      params: { 'grant_type': 'client_credentials' }
    }
    return this.http.post<any>(paypalBaseUrl + 'v1/oauth2/token', {}, paypalHeader).pipe();
  }

  getOrderId(authorizationToken, orderId) {
    let paypalHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authorizationToken
      })
    }
    return this.http.get<any>(paypalBaseUrl + 'v2/checkout/orders/' + orderId, paypalHeader).pipe();
  }

  getInvoices(authorizationToken) {
    const paypalHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + authorizationToken
      }),
      params: { 'page': '3', 'page_size': '4', 'total_count_required': 'true' }

    }
    return this.http.get<any>(paypalBaseUrl + 'v1/invoicing/invoices', paypalHeader).pipe();
  }

  /** pwinty api calls  */

  createOrder() {
    let data = {
      'countryCode': 'GB',
      'recipientName': 'Mr. Jones',
      'address1': 'The Hollie',
      'addressTownOrCity': 'Cardiff',
      'stateOrCounty': 'Glamorgan',
      'postalOrZipCode': 'CF111AX',
      'preferredShippingMethod': 'Express'
    }
    return this.http.post<any>(pwintyBaseurl + '/orders', data, pwintyApiOptions).pipe();
  }
  addImage(orderId) {
    let data = {
      'sku': 'GLOBAL-PHO-8X10',
      'url': "http%3A%2F%2Fwww.testserver.com%2Faphoto.jpg",
      'copies': '2',
      'sizing': 'Crop'
    }
    return this.http.post<any>(pwintyBaseurl + '/orders/' + orderId + '/images', data, pwintyApiOptions).pipe();

  }
  checkOrder(orderId) {
    return this.http.get<any>(pwintyBaseurl + '/orders/' + orderId + '/SubmissionStatus ', pwintyApiOptions).pipe();

  }
  orderStatus(orderId) {
    let data = { status: 'Submitted' };
    return this.http.post<any>(pwintyBaseurl + '/orders/' + orderId + '/status', data, pwintyApiOptions).pipe();
  }
}
