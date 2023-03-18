import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { AccountRouting } from './account-routing.module';

@NgModule({
  declarations: [AccountComponent, AccountEditComponent, AccountLoginComponent],
  imports: [CommonModule, AccountRouting],
})
export class AccountModule {}
