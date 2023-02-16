import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  private BASE_URL = 'http://localhost:3000/students';

  getAllUsers() {
    return this.httpClient.get(this.BASE_URL);
  }

  getUserById(id: any) {
    return this.httpClient.get(`${this.BASE_URL}/${id}`);
  }

  addUser(user: any) {
    return this.httpClient.post(this.BASE_URL, user);
  }

  updateUser(id: any, newUser: any) {
    return this.httpClient.put(`${this.BASE_URL}/${id}`, newUser);
  }

  deleteUserById(id: any) {
    return this.httpClient.delete(`${this.BASE_URL}/${id}`);
  }
}
