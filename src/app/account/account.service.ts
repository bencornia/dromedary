import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AccountService {
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

    this.http
      .post('http://localhost:3000/api/users', formData)
      .subscribe((responseData) => {
        console.log(responseData);
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

    this.http
      .put('http://localhost:3000/api/users', formData)
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }
}
