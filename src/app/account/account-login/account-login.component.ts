import { Component } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css'],
})
export class AccountLoginComponent {
  constructor(private accountService: AccountService) {}
}
