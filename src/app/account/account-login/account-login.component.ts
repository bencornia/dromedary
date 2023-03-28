import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AccountService } from '../account.service';
import { AccountData } from '../user.model';

@Component({
    selector: 'app-account-login',
    templateUrl: './account-login.component.html',
    styleUrls: ['./account-login.component.css'],
})
export class AccountLoginComponent implements OnInit {
    form: FormGroup;
    errorMsg: string | null;

    constructor(
        private accountService: AccountService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl(null, {
                validators: [Validators.required, Validators.email],
            }),
            password: new FormControl(null, {
                validators: [
                    Validators.required,
                    Validators.pattern(
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/m
                    ),
                ],
            }),
        });
    }

    onLogin() {
        if (!this.form.valid) {
            return;
        }

        this.accountService
            .login(this.form.value.email, this.form.value.password)
            .subscribe({
                next: () => {
                    this.router.navigate(['/account']);
                },
                error: (err: Error) => {
                    this.errorMsg = err.message;
                },
            });

        this.form.reset();
    }

    // Getters
    get email() {
        return this.form.get('email');
    }

    get password() {
        return this.form.get('password');
    }
}
