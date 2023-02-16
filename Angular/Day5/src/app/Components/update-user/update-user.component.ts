import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styles: [],
})
export class UpdateUserComponent implements OnInit {
  public user: any;
  public userID: any;
  constructor(
    private router: Router,
    public myRoute: ActivatedRoute,
    public httpClient: UserService
  ) {
    this.user = {};
  }

  // [** function that communicates the service and get the user details on component initialization **] //

  ngOnInit(): void {
    this.userID = this.myRoute.snapshot.params['id'];
    this.httpClient.getUserById(this.userID).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // [** function that communicates service to update user details in backend **] //

  updateUser(name: any, age: any, email: any, phone: any, address: any) {
    this.user = {
      name: name,
      age: +age,
      email: email,
      phone: phone,
      address: address,
    };

    this.httpClient.updateUser(this.userID, this.user).subscribe({
      next: (data) => {
        console.log(
          `%cUser updated successfully`,
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

  // [** form validation, form controls initialized because data of user is loaded after the form check **] //

  public updateForm = new FormGroup({
    name: new FormControl('Lorem Ipsum', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),

    age: new FormControl(22, [
      Validators.required,
      Validators.min(16),
      Validators.max(100),
    ]),
    email: new FormControl('example@admin.com', [
      Validators.required,
      Validators.email,
    ]),
    phone: new FormControl('12345678910', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(20),
    ]),
    address: new FormControl('1234 Lorem st.', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
  });

  // [** getters for conditionals form validations in html **] //

  get isInputsEmpty() {
    return (
      this.updateForm.controls['name'].value === null &&
      this.updateForm.controls['age'].value === null &&
      this.updateForm.controls['email'].value === null &&
      this.updateForm.controls['phone'].value === null &&
      this.updateForm.controls['address'].value === null
    );
  }

  get isNameValid() {
    return this.updateForm.controls['name'].valid;
  }

  get isAgeValid() {
    return this.updateForm.controls['age'].valid;
  }

  get isEmailValid() {
    return this.updateForm.controls['email'].valid;
  }

  get isPhoneValid() {
    return this.updateForm.controls['phone'].valid;
  }

  get isAddressValid() {
    return this.updateForm.controls['address'].valid;
  }

  get isFormValid() {
    return this.updateForm.valid;
  }
}
