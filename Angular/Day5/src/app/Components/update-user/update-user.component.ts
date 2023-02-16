import { Component, OnInit } from '@angular/core';
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
  ) {}

  ngOnInit(): void {
    this.userID = this.myRoute.snapshot.params['id'];

    this.httpClient.getUserById(this.userID).subscribe({
      next: (data) => {
        console.log(data);
        this.user = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

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
}
