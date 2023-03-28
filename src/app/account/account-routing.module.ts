import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { AccountPasswordComponent } from './account-password/account-password.component';
import { AccountComponent } from './account.component';

const routes: Routes = [
    {
        path: 'account',
        component: AccountComponent,
        children: [
            { path: '', component: AccountDetailComponent },
            { path: 'login', component: AccountLoginComponent },
            { path: 'edit', component: AccountEditComponent },
            { path: 'password', component: AccountPasswordComponent },
        ],
    },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class AccountRoutingModule {}
