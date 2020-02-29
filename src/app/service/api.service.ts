import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};


@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }
  
  getPaymentIntent(){
    return this.http.get<any>(environment.baseUrl + 'stripe/paymentIntent', httpOptions).pipe();    
  }
  getIdealPaymentIntent(){
    return this.http.get<any>(environment.baseUrl + 'stripe/idealPaymentIntent', httpOptions).pipe();        
  }
}
