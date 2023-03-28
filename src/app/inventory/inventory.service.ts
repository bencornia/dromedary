import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from './item.model';

import { environment } from 'src/environments/environment';
import { AccountService } from '../account/account.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class InventoryService {
    itemsSubject = new Subject<Item[]>();
    items: Item[];

    constructor(
        private http: HttpClient,
        private accountService: AccountService,
        private router: Router
    ) {}

    addItem(item: Item) {
        // Add userid
        item.businessId = this.accountService.accountData.userId;

        this.http
            .post(`${environment.apiURL}/products`, item)
            .subscribe((item: Item) => {
                this.items.push(item);
            });
    }

    getItem(index: number) {
        return this.items[index];
    }

    deleteItem(index: number) {
        const item = this.items.splice(index, 1)[0];

        // Update MongoDB
        this.http
            .delete(`${environment.apiURL}/products/${item._id}`)
            .subscribe(() => {
                this.router.navigate(['/inventory']);
            });
    }

    updateItem(index: number, updateItem: Item) {
        const item = this.items[index];

        // Update db
        this.http
            .put(`${environment.apiURL}/products/${item._id}`, updateItem)
            .subscribe((item: Item) => {
                this.items[index] = item;
                this.router.navigate(['/inventory']);
            });
    }

    getAllItems() {
        this.http
            .get(
                `${environment.apiURL}/products/business/${this.accountService.accountData.userId}`
            )
            .subscribe((items: Item[]) => {
                this.itemsSubject.next(items);
                this.items = items;
            });
    }
}
