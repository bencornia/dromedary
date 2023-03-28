import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from '../account.service';
import { AccountData } from '../user.model';

@Component({
    selector: 'app-account-password',
    templateUrl: './account-password.component.html',
    styleUrls: ['./account-password.component.css'],
})
export class AccountPasswordComponent implements OnInit, OnDestroy {
    passwordForm: FormGroup;
    authListener: Subscription;
    accountData: AccountData;
    errMsg: string;

    constructor(
        private accountService: AccountService,
        private router: Router
    ) {}

    ngOnInit() {
        // Subscribe to auth state
        this.authListener = this.accountService.authStatus.subscribe(
            (state: boolean) => {
                this.accountData = this.accountService.getAccountData();
            }
        );

        // Create Form
        this.passwordForm = new FormGroup({
            currentPassword: new FormControl(null, {
                validators: [
                    Validators.required,
                    Validators.pattern(
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/m
                    ),
                ],
            }),
            newPassword: new FormControl(null, {
                validators: [
                    Validators.required,
                    Validators.pattern(
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/m
                    ),
                ],
            }),
        });
    }

    ngOnDestroy() {
        this.authListener.unsubscribe();
    }

    onUpdatePassword() {
        if (!this.passwordForm.valid) {
            return;
        }

        // Update Password
        this.accountService
            .updatePassword(this.accountData.userId, this.passwordForm.value)
            .subscribe({
                next: () => {
                    this.router.navigate(['/account']);
                },
                error: (err: Error) => {
                    this.errMsg = err.message;
                },
            });
    }
}
