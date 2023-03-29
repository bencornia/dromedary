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

        this.router.navigate(['/account']);
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

    // createUser(formData: FormData, email, password) {
    //     return this.http
    //         .post<IUser>(`${environment.apiURL}/users`, formData)
    createUser(userData: IUser, email: string, password: string) {
        return this.http
            .post<IUser>(`${environment.apiURL}/users`, userData)
            .pipe(
                catchError(this.handleError),
                tap(() => {
                    this.login(email, password).subscribe();
                })
            );
    }

    // updateUser(formData: FormData, userId: string) {
    //     return this.http
    //         .put(`${environment.apiURL}/users/${userId}`, formData)
    updateUser(userData: IUser, userId: string) {
        return this.http
            .put(`${environment.apiURL}/users/${userId}`, userData)
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
            .subscribe(({ businessName, email, ownerName }) => {
                // Update current user
                this.accountData.businessName = businessName;
                this.accountData.email = email;
                this.accountData.ownerName = ownerName;
                // this.accountData.profileImagePath = profileImagePath;

                this.handleAuthentication(this.accountData);
            });
    }

    delete(userId: string) {
        return this.http.delete(`${environment.apiURL}/users/${userId}`).pipe(
            catchError(this.handleError),
            tap(() => {
                localStorage.removeItem('dromedary-account-data');
                this.authStatus.next(false);
                this.http
                    .delete(`${environment.apiURL}/products/business/${userId}`)
                    .subscribe();
            })
        );
    }

    updatePassword(userId: string, passwords: {}) {
        return this.http
            .put(`${environment.apiURL}/users/password/${userId}`, passwords)
            .pipe(catchError(this.handleError));
    }
}
