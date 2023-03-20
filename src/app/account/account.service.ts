import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private http: HttpClient) {}

  login() {}

  createUser(user: IUser) {
    let formData: any = new FormData();
    this.http.post('http://localhost:3000/api/users', user).subscribe(() => {});
  }
}
