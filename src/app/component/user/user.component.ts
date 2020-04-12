import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Login, Signup } from '../../interface/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  login:Login;
  signupUser:Signup;

  constructor(public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.login = {
      email:'',
      password:''
    }
    this.signupUser = {
      email:'',
      phone_number:'',
      name:'',
      password:''
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }
  submitLoginForm(){

  }
  submitSignupForm(){
    
  }
}
