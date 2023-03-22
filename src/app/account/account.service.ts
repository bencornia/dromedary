import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from './user.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private _token: string;
    private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient) {}

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    get token() {
        return this._token;
    }

    set token(val: string) {
        this._token = val;
    }

    login(email: string, password: string) {
        this.http
            .post<{ token: string }>('http://localhost:3000/api/users/login', {
                email,
                password,
            })
            .subscribe((resData) => {
                this.token = resData.token;

                // Update login status
                this.authStatusListener.next(true);
            });
    }

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
