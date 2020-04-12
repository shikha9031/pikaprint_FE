import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

import { UserComponent } from '../user/user.component';

import * as menuRef from '../../store/action/menu.action';

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

  constructor(public dialog: MatDialog, private _store:Store<any>, private toastr: ToastrService) { }

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

  openDialog(param): void {
    let dialogRef = this.dialog.open(UserComponent, {
      data: { type: param }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  open(param){
     if(param === 'contact-us'){
      this.contactusSec = true;
    }
    else{
      this.feedbackSec = true;
      this.clearFeedbackForm();
    }
  }

  backToNavBtn(param){
     if(param === 'contact-us'){
      this.contactusSec = false;
    }
    else{
      this.feedbackSec = false;
    }
  }

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
    console.log("feedback");
    this.toastr.success("Feedback Submitted");                      
  }
}
