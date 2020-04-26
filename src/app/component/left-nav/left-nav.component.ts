import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import * as firebase from "firebase";

import { UserComponent } from '../user/user.component';

import * as menuRef from '../../store/action/menu.action';
import * as commonRef from '../../store/action/common.action';

import { Menu } from '../../interface/menu';
import { Feedback } from '../../interface/feedback';

@Component({
  selector: 'left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {

  showLeftNav: boolean = false;
  contactusSec:boolean = false;

  /** feedback related var declaration */
  feedbackSec:boolean = false;
  feedbackObj:Feedback;

  /** user status check */
  loginFlag: boolean;

  constructor(public dialog: MatDialog, private _store:Store<any>, private toastr: ToastrService) { 
    firebase.auth().onAuthStateChanged(user=> {
      if (user) {
        // User is signed in.
        this.loginFlag = true;
      } else {
        // No user is signed in.       
        this.loginFlag = false;
      }
    });
  }

  ngOnInit() {
    this._store.select('menuReducer').subscribe((res:Menu)=>{
      if(res) this.showLeftNav = res.openSideMenu;
    });
    this.clearFeedbackForm();
  }

  closeMenu() {
    this.showLeftNav = false;
    this._store.dispatch(new menuRef.OpenSideMenu(false));    
  }

  // Back to main menu
  backToNavBtn(param){
    if(param === 'contact-us'){
     this.contactusSec = false;
   }
   else{
     this.feedbackSec = false;
   }
 }

 /** open dialog  */

  openDialog(param): void {
    let dialogRef = this.dialog.open(UserComponent, {
      data: { type: param }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  /** open contacr us and feedback  form */
  open(param){
     if(param === 'contact-us'){
      this.contactusSec = true;
    }
    else if(param === 'about-us'){

    }
    else{
      this.feedbackSec = true;
      this.clearFeedbackForm();
    }
  }

  /** choose radio button option for feedback */

  radioBtnOption(param){
    this.feedbackObj.type = param;
  }


  clearFeedbackForm(): any {
    this.feedbackObj = {
      name:'',
      email:'',
      type:'comment',
      desc:''
    }
  }

  submitFeedback(){
    this.toastr.success("Feedback Submitted");                      
  }

  // logout user function

  logout(){
    firebase.auth().signOut().then(res=> {
      // Sign-out successful.
      this.toastr.success("User Logout Successfully");  
      this.loginFlag = false;                          
    }).catch(error=> {
      // An error happened.
      this.toastr.error("Something went wrong!!! Please try again");
      //this.toastr.error("Something went wrong !! Please try after sometime");                            
    });
  }

  aboutusClick(){
     this._store.dispatch(new commonRef.isMenuOpen(false));
  }
  homeClick(){
    this._store.dispatch(new commonRef.isMenuOpen(true));
  }
}
