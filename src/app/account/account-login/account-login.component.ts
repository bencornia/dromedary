import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css'],
})
export class AccountLoginComponent implements OnInit {
  form: FormGroup;

  constructor(private accountService: AccountService) {}

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

    this.accountService.login(this.form.value.email, this.form.value.password);

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
