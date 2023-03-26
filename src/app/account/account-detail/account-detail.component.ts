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
    private authSub: Subscription;
    accountData: AccountData | null;

    constructor(private accountService: AccountService) {}

    ngOnInit(): void {
        // Create subscription to authentication
        this.authSub = this.accountService.accountData.subscribe(
            (accountData) => {
                this.accountData = accountData;
            }
        );
    }

    ngOnDestroy(): void {
        this.authSub.unsubscribe();
    }
}
