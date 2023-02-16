import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { ListUsersComponent } from './Components/list-users/list-users.component';
import { ShowUserComponent } from './Components/show-user/show-user.component';
import { UpdateUserComponent } from './Components/update-user/update-user.component';

const routes: Routes = [
  { path: '', component: ListUsersComponent },
  { path: 'users', component: ListUsersComponent },
  { path: 'users/add', component: AddUserComponent },
  { path: 'users/:id', component: ShowUserComponent },
  { path: 'users/edit/:id', component: UpdateUserComponent },
  { path: 'users/delete/:id', component: ListUsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
