import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, ObservableInput, tap } from 'rxjs';
import { AuthResponse } from './user.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
  loggedIn = false;

  constructor(private http: HttpClient) {}

  login() {}

  createUser(user: IUser) {
    const formData = new FormData();

    // Append optional fields
    if (user.profileImage) {
      formData.append(
        'profileImage',
        user.profileImage,
        user.profileImage.name
      );
    }

    if (user.apiKey) {
      formData.append('apiKey', user.apiKey);
    }

    formData.append('ownerName', user.ownerName);
    formData.append('businessName', user.businessName);
    formData.append('email', user.email);
    formData.append('password', user.password);

    return this.http
      .post<AuthResponse>('http://localhost:3000/api/users', formData)
      .subscribe((authResponse: AuthResponse) => {
        console.log(authResponse);
      });
  }

  updateUser(user: IUser) {
    const formData = new FormData();
    formData.append('profileImage', user.profileImage, 'userprofileimage');
    formData.append('ownerName', user.ownerName);
    formData.append('businessName', user.businessName);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('apiKey', user.apiKey);

    return this.http.put('http://localhost:3000/api/users', formData);
  }
}
