import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import  * as  firebase  from 'firebase';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};


@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }
  
  getPaymentIntent(){
    return this.http.get<any>(environment.baseUrl + 'pikaprint/paymentIntent', httpOptions).pipe();    
  }
  getIdealPaymentIntent(){
    return this.http.get<any>(environment.baseUrl + 'pikaprint/idealPaymentIntent', httpOptions).pipe();        
  }
  uploadImages(upload:any){
    let fileName= 'uploads/'+ new Date().getTime()+upload.file.name;
    let storageRef = firebase.storage().ref(fileName);    
    let uploadTask = storageRef.put(upload.file);//firebase.storage.TaskEvent.STATE_CHANGED
    uploadTask.on('state_changed', function(snapshot){
            upload.progress =  (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
            upload.name = fileName;
      },
      function(error){
            console.log("error");
      },
      function(){
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          upload.url =  downloadURL;
        });
      });
      return upload.url;
  }
}
