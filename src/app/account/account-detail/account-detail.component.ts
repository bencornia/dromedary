import { Component, OnDestroy, OnInit } from '@angular/core';
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

    constructor(private accountService: AccountService) {}

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
        this.accountService.delete(this.accountData.userId);
    }
}
