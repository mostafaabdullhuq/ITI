import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styles: [],
})
export class AddUserComponent {
  constructor(
    private router: Router,
    public myRoute: ActivatedRoute,
    public httpClient: UserService
  ) {}

  public registerForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),

    age: new FormControl(null, [
      Validators.required,
      Validators.min(16),
      Validators.max(100),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(20),
    ]),
    address: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
  });

  get isInputsEmpty() {
    return (
      this.registerForm.controls['name'].value === null &&
      this.registerForm.controls['age'].value === null &&
      this.registerForm.controls['email'].value === null &&
      this.registerForm.controls['phone'].value === null &&
      this.registerForm.controls['address'].value === null
    );
  }
  get isNameValid() {
    return this.registerForm.controls['name'].valid;
  }

  get isAgeValid() {
    return this.registerForm.controls['age'].valid;
  }

  get isEmailValid() {
    return this.registerForm.controls['email'].valid;
  }

  get isPhoneValid() {
    return this.registerForm.controls['phone'].valid;
  }

  get isAddressValid() {
    return this.registerForm.controls['address'].valid;
  }

  get isFormValid() {
    return this.registerForm.valid;
  }

  addUser(name: any, age: any, email: any, phone: any, address: any) {
    let user = {
      name: name,
      age: +age,
      email: email,
      phone: phone,
      address: address,
    };
    this.httpClient.addUser(user).subscribe({
      next: (data) => {
        console.log(
          `%cUser added successfully`,
          'font-size: 30px; color: green;',
          data
        );
        this.router.navigate(['/users']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
