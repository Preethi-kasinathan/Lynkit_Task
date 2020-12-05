import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  registerationForm: FormGroup;
  user: any = {};
  userSubmitted: boolean;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.registerationForm = new FormGroup({
    //   FullName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    //   EmailID: new FormControl(null, [Validators.required, Validators.email]),
    //   MobileNo: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    //   Password: new FormControl(null, Validators.required),
    //   ConfirmPassword: new FormControl(null, Validators.required)
    // }, this.PasswordMatchingValidator);
    this.CreateRegisterationForm();
  }

  // tslint:disable-next-line:typedef
  CreateRegisterationForm(){
    this.registerationForm = this.fb.group({
      FullName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      EmailID: new FormControl(null, [Validators.required, Validators.email]),
      MobileNo: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      Password: new FormControl(null, Validators.required),
      ConfirmPassword: new FormControl(null, Validators.required)
    }, this.PasswordMatchingValidator);
  }

  PasswordMatchingValidator(fg: FormGroup): Validators {
    return fg.get('Password').value === fg.get('ConfirmPassword').value ? null : {notmatched: true};
  }

  // tslint:disable-next-line:typedef
  get FullName() {
    return this.registerationForm.get('FullName') as FormControl;
  }

  // tslint:disable-next-line:typedef
  get EmailID() {
    return this.registerationForm.get('EmailID') as FormControl;
  }

  // tslint:disable-next-line:typedef
  get MobileNo() {
    return this.registerationForm.get('MobileNo') as FormControl;
  }

  // tslint:disable-next-line:typedef
  get Password() {
    return this.registerationForm.get('Password') as FormControl;
  }

  // tslint:disable-next-line:typedef
  get ConfirmPassword() {
    return this.registerationForm.get('ConfirmPassword') as FormControl;
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
