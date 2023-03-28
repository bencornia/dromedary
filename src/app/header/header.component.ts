import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from '../account/account.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    private authListener: Subscription;
    isAuthenticated: boolean;

    constructor(private accountService: AccountService) {}

    ngOnInit(): void {
        this.authListener = this.accountService.authStatus.subscribe(
            (state: boolean) => {
                this.isAuthenticated = state;
            }
        );

        if (!this.isAuthenticated) {
            this.accountService.autologin();
        }
    }

    ngOnDestroy(): void {
        this.authListener.unsubscribe();
    }

    onLogout() {
        this.accountService.logout();
    }
}
