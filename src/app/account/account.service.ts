import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountData, IUser } from './user.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private _token: string;
    private tokenTimer: NodeJS.Timeout;
    accountData = new BehaviorSubject<AccountData>(null);

    constructor(private http: HttpClient, private router: Router) {}

    get token() {
        return this._token;
    }

    set token(val: string) {
        this._token = val;
    }

    private handleAuthentication(accountData: AccountData) {
        // Set token
        this.token = accountData.token;

        // Update authentication status
        this.accountData.next(accountData);

        // Set auto logout
        this.autologout(accountData);

        // Add account data to localstorage
        localStorage.setItem(
            'dromedary-account-data',
            JSON.stringify(accountData)
        );

        // Redirect to inventory
        this.router.navigate(['/inventory']);
    }

    autologout(accountData: AccountData) {
        // Logout user in 1 hour
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, accountData.expiration - Date.now());
    }

    autologin() {
        // Get account data from local storage
        const accountData: AccountData | null = JSON.parse(
            localStorage.getItem('dromedary-account-data')
        );

        // Check for an existing user
        if (!accountData) {
            return;
        }

        // Logout if token has expired
        if (accountData.expiration <= Date.now()) {
            this.logout();

            // redirect to login page

            return;
        }

        // Handle authentication
        this.handleAuthentication(accountData);
    }

    logout() {
        // Unset token
        this.token = '';

        // Update authentication status
        this.accountData.next(null);

        // Clear timer
        clearTimeout(this.tokenTimer);

        // Redirect to login
        this.router.navigate(['/account/login']);
        localStorage.removeItem('dromedary-account-data');
    }

    login(email: string, password: string) {
        this.http
            .post<AccountData>('http://localhost:3000/api/users/login', {
                email,
                password,
            })
            .subscribe((accountData) => {
                this.handleAuthentication(accountData);

                // Redirect to inventory
                this.router.navigate(['/inventory']);
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
            .post('http://localhost:3000/api/users', formData)
            .subscribe(() => {
                this.login(user.email, user.password);
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
