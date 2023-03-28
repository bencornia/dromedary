import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, tap, throwError } from 'rxjs';
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

        return this.http.post(`${environment.apiURL}/products`, item).pipe(
            catchError(this.handleError),
            tap((item: Item) => {
                this.items.push(item);
            })
        );
    }

    getItem(index: number) {
        console.log(index);

        return this.items[index];
    }

    deleteItem(index: number) {
        const item = this.items.splice(index, 1)[0];

        // Update MongoDB
        return this.http
            .delete(`${environment.apiURL}/products/${item._id}`)
            .pipe(catchError(this.handleError));
    }

    updateItem(index: number, updateItem: Item) {
        const item = this.items[index];

        // Update db
        return this.http
            .put(`${environment.apiURL}/products/${item._id}`, updateItem)
            .pipe(catchError(this.handleError));
    }

    getAllItems() {
        return this.http
            .get<Item[]>(
                `${environment.apiURL}/products/business/${this.accountService.accountData.userId}`
            )
            .pipe(
                catchError(this.handleError),
                tap((items: Item[]) => {
                    this.items = items;
                    this.itemsSubject.next(this.items);
                })
            );
    }

    handleError(error: HttpErrorResponse) {
        let msg: string;

        switch (error.status) {
            case 401:
                msg = 'You are not authorized! Incorrect credentials!';
                break;
            case 500:
                msg = 'An internal server error occurred. Please try again!';
                break;

            default:
                msg = 'An unknown error occurred. Please try again.';
                break;
        }

        return throwError(() => new Error(msg));
    }
}
