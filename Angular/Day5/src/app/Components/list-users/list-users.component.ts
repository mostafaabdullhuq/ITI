import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styles: [],
})
export class ListUsersComponent implements OnInit {
  public students: any;

  constructor(
    private router: Router,
    public myRoute: ActivatedRoute,
    public httpClient: UserService
  ) {}

  ngOnInit(): void {
    let userID = this.myRoute.snapshot.params['id'] || 0;
    if (this.myRoute?.routeConfig?.path === 'users/delete/:id') {
      this.httpClient.deleteUserById(userID).subscribe({
        next: (_) => {
          console.log(
            '%cUser deleted successfully.',
            'font-size: 30px; color: green;'
          );
          this.router.navigate(['/users']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.httpClient.getAllUsers().subscribe({
        next: (data) => {
          this.students = data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
