import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Login, Signup } from '../../interface/user';
import * as firebase from "firebase";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  login: Login;
  signupUser: Signup;
  email: string;

  constructor(public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) {
    var user = firebase.auth().currentUser;

    if (user != null) {
      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
    }
  }

  ngOnInit() {
    this.login = {
      email: '',
      password: ''
    }
    this.signupUser = {
      email: '',
      password: '',
      name: ''
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  submitLoginForm() {
    firebase.auth().signInWithEmailAndPassword(this.login.email, this.login.password).then(res => {
      this.toastr.success("User login successfully");
      this.closeModal();
    }).catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      this.toastr.error(errorMessage);
      // ...
    });
  }

  submitSignupForm() {
    firebase.auth().createUserWithEmailAndPassword(this.signupUser.email, this.signupUser.password).then(res => {
      this.sendEmailVerification();
      this.closeModal();
      this.updateProfile(this.signupUser.name);
    }).catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
        this.toastr.error('The password is too weak.');
      } else {
        this.toastr.error(errorMessage);
      }
      // [END_EXCLUDE]
    })

  }

  updateProfile(email) {
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: email
    }).then(res => {
      // Update successful.
    }).catch(function (error) {
      // An error happened.
      return error;
    });
  }

  sendEmailVerification() {
    // [START sendemailverification]
    firebase.auth().currentUser.sendEmailVerification().then(res => {
      // Email Verification sent!
      this.toastr.success('Email Verification Sent!');
    }).catch(error => {
      this.toastr.error("Something went wrong !!! Please try after sometime");
    });
    // [END sendemailverification]
  }


  updatePassword(email) {
    var auth = firebase.auth();
    var emailAddress = email

    auth.sendPasswordResetEmail(emailAddress).then(res => {
      // Email sent.
      this.toastr.success("Email send successfully.");
      this.closeModal();
    }).catch(function (error) {
      // An error happened.
      this.toastr.error("Something went wrong !!! Please try after sometime");
    });
  }

  forgotPass() {
    this.data.type = 'forgot-password';
  }

}
