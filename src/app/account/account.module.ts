import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { AccountRoutingModule } from './account-routing.module';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountPasswordComponent } from './account-password/account-password.component';

@NgModule({
    declarations: [
        AccountComponent,
        AccountEditComponent,
        AccountLoginComponent,
        AccountDetailComponent,
        AccountPasswordComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AccountRoutingModule,
    ],
})
export class AccountModule {}
