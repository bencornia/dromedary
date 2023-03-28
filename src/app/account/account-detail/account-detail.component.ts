import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from '../account.service';
import { AccountData } from '../user.model';

@Component({
    selector: 'app-account-detail',
    templateUrl: './account-detail.component.html',
    styleUrls: ['./account-detail.component.css'],
})
export class AccountDetailComponent implements OnInit, OnDestroy {
    private authListener: Subscription;
    accountData: AccountData;
    isAuthenticated: boolean;
    errMsg: string;

    constructor(
        private accountService: AccountService,
        private router: Router
    ) {}

    ngOnInit(): void {
        // Create subscription to authentication
        this.authListener = this.accountService.authStatus.subscribe(
            (state: boolean) => {
                this.isAuthenticated = state;
                this.accountData = this.accountService.getAccountData();
            }
        );
    }

    ngOnDestroy(): void {
        this.authListener.unsubscribe();
    }

    onDeleteAccount() {
        this.accountService.delete(this.accountData.userId).subscribe({
            next: () => {
                this.router.navigate(['/account/login']);
            },
            error: (err: Error) => {
                this.errMsg = err.message;
            },
        });
    }
}
