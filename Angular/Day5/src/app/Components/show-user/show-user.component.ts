import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styles: [],
})
export class ShowUserComponent {
  constructor(
    private router: Router,
    public myRoute: ActivatedRoute,
    public httpClient: UserService
  ) {}

  public user: any;
  public userID = this.myRoute.snapshot.params['id'];

  ngOnInit(): void {
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
}
