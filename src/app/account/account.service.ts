import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AccountData, IUser } from './user.model';
import { catchError, tap, throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private _token: string;
    private tokenTimer: NodeJS.Timeout;
    accountData: AccountData;
    authStatus = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient, private router: Router) {}

    get token() {
        return this._token;
    }

    set token(val: string) {
        this._token = val;
    }

    getAccountData() {
        return this.accountData;
    }

    private handleAuthentication(accountData: AccountData) {
        // Set token
        this.token = accountData.token;

        // Update authentication status
        this.authStatus.next(true);
        this.accountData = accountData;

        // Set auto logout
        this.autologout(accountData);

        // Add account data to localstorage
        localStorage.setItem(
            'dromedary-account-data',
            JSON.stringify(accountData)
        );
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

            return;
        }

        // Handle authentication
        this.handleAuthentication(accountData);
    }

    logout() {
        // Unset token
        this.token = '';

        // Update authentication status
        this.authStatus.next(false);

        // Clear timer
        clearTimeout(this.tokenTimer);

        // Redirect to login
        this.router.navigate(['/account/login']);
        localStorage.removeItem('dromedary-account-data');
    }

    login(email: string, password: string) {
        return this.http
            .post<AccountData>(`${environment.apiURL}/users/login`, {
                email,
                password,
            })
            .pipe(
                catchError(this.handleError),
                tap((accountData: AccountData) => {
                    this.handleAuthentication(accountData);
                })
            );
    }

    handleError(error: HttpErrorResponse) {
        let msg: string;

        switch (error.status) {
            case 401:
                msg = 'You are not authorized! Incorrect credentials!';
                break;
            case 500:
                msg = 'An internal server error occurred. Please try again!';
                break;

            default:
                msg = 'An unknown error occurred. Please try again.';
                break;
        }

        return throwError(() => new Error(msg));
    }

    createUser(formData: FormData) {
        return this.http
            .post<IUser>('http://localhost:3000/api/users', formData)
            .pipe(
                catchError(this.handleError),
                tap(({ email, password }) => {
                    this.login(email, password);
                })
            );
    }

    updateUser(formData: FormData, userId: string) {
        return this.http
            .put(`${environment.apiURL}/users/${userId}`, formData)
            .pipe(
                catchError(this.handleError),
                tap(() => {
                    this.updateAccount(userId);
                })
            );
    }

    updateAccount(userId: string) {
        this.http
            .get<IUser>(`${environment.apiURL}/users/${userId}`)
            .subscribe(
                ({ businessName, email, ownerName, profileImagePath }) => {
                    // Update current user
                    this.accountData.businessName = businessName;
                    this.accountData.email = email;
                    this.accountData.ownerName = ownerName;
                    this.accountData.profileImagePath = profileImagePath;

                    this.handleAuthentication(this.accountData);
                }
            );
    }

    delete(userId: string) {
        this.http
            .delete(`${environment.apiURL}/users/${userId}`)
            .subscribe(() => {
                localStorage.removeItem('dromedary-account-data');
                this.authStatus.next(false);
                this.router.navigate(['/account/login']);
            });
    }
}
