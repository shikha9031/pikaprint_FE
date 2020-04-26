import { Component } from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  
  constructor(){
   let firebaseConfig = {
      apiKey: "AIzaSyA_rhkxelhPU4AEbyvr7RX2K-_LR2my0dk",
      authDomain: "pikaprint-22450.firebaseapp.com",
      databaseURL: "https://pikaprint-22450.firebaseio.com",
      projectId: "pikaprint-22450",
      storageBucket: "pikaprint-22450.appspot.com",
      messagingSenderId: "268339828922",
      appId: "1:268339828922:web:3770907fb5b48611f78a83",
      measurementId: "G-KD042J5HGL"
    }
     firebase.initializeApp(firebaseConfig);
     var storage = firebase.storage();
   //  firebase.analytics();
  }
}
