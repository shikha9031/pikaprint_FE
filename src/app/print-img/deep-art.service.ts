import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const baseUrl = 'https://api.deeparteffects.com/v1/noauth/';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json,  application/x-www-form-urlencoded, multipart/form-data, text/plain',
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
    return this.http.post<any>(baseUrl + 'result?submissionId='+ param , httpOptions).pipe();        
  }
  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  // };
}
