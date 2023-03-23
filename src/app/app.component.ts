import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'dromedary';

    constructor(private accountService: AccountService) {}

    ngOnInit(): void {}
}
