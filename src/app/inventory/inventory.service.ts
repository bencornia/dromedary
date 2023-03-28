import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from './item.model';

import { environment } from 'src/environments/environment';
import { AccountService } from '../account/account.service';

@Injectable({ providedIn: 'root' })
export class InventoryService {
    itemsSubject = new Subject<Item[]>();
    items: Item[];

    constructor(
        private http: HttpClient,
        private accountService: AccountService
    ) {}

    addItem() {}

    getAllItems() {
        this.http
            .get(
                `${environment.apiURL}/products/business/${this.accountService.accountData.userId}`
            )
            .subscribe((items: Item[]) => {
                this.itemsSubject.next(items);
            });
    }
}
