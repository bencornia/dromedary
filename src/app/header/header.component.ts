import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from '../account/account.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    private authListenerSubs: Subscription;
    isAuthenticated = false;

    constructor(private accountService: AccountService) {}

    ngOnInit(): void {
        this.authListenerSubs = this.accountService.accountData.subscribe(
            (accountData) => {
                this.isAuthenticated = !accountData ? false : true;
            }
        );

        if (!this.isAuthenticated) {
            this.accountService.autologin();
        }
    }

    ngOnDestroy(): void {
        this.authListenerSubs.unsubscribe();
    }

    onLogout() {
        this.accountService.logout();
    }
}
