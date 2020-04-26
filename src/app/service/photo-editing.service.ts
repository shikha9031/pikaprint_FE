import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import * as xml2js from 'xml2js';
import {map} from 'rxjs/operators';

@Injectable()
export class PhotoEditingService {

  constructor(private http: HttpClient) { }

  editPhoto(data) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'text/html, application/xhtml+xml, */*',
        'Content-Type': 'application/x-www-form-urlencoded'
        }),
        responseType: 'test/xml' as 'json' 
    };

    return this.http.post<any>(environment.photoEditingBaseUrl + 'addtask', data.toString(), httpOptions);
  }

  getResultRequest(request_id){
    let httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'text/html, application/xhtml+xml, */*',
        'Content-Type': 'application/x-www-form-urlencoded'
        }),
        params: { 'request_id' : request_id },                
        responseType: 'test/xml' as 'json'
    };

    return this.http.get<any>(environment.photoEditingBaseUrl + 'getresult', httpOptions);
  }
}
