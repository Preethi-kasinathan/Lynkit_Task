import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerationForm: FormGroup;
  user: any = {};
  userSubmitted: boolean;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.CreateRegisterationForm();
  }

  // tslint:disable-next-line:typedef
  CreateRegisterationForm(){
    this.registerationForm = this.fb.group({
      EmailID: new FormControl(null, [Validators.required, Validators.email]),
      Password: new FormControl(null, Validators.required)
    });
  }

  // tslint:disable-next-line:typedef
  get EmailID() {
    return this.registerationForm.get('EmailID') as FormControl;
  }

  // tslint:disable-next-line:typedef
  get Password() {
    return this.registerationForm.get('Password') as FormControl;
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    console.log(this.registerationForm.value);
    this.userSubmitted = true;
    if (this.registerationForm.valid) {
    this.user = Object.assign(this.user, this.registerationForm.value);
    this.addUser(this.user);
    this.registerationForm.reset();
    this.userSubmitted = false;
    }
  }

  // tslint:disable-next-line:typedef
  addUser(user) {
    let users = [];
    if (localStorage.getItem('users')) {
      users = JSON.parse(localStorage.getItem('users'));
      users = [user, ...users];
    } else {
      users = [user];
    }
    localStorage.setItem('users', JSON.stringify(user));
  }

}
