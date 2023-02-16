import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';

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
