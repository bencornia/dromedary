import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRouting } from './account-routing.module';
import { AccountComponent } from './account.component';
import { AccountEditComponent } from './account-edit/account-edit.component';

@NgModule({
  declarations: [AccountComponent, AccountEditComponent],
  imports: [CommonModule, AccountRouting],
})
export class AccountModule {}
