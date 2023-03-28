import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InventoryService } from '../inventory.service';
import { Item } from '../item.model';

@Component({
    selector: 'app-inventory-list',
    templateUrl: './inventory-list.component.html',
    styleUrls: ['./inventory-list.component.css'],
})
export class InventoryListComponent implements OnInit, OnDestroy {
    inventoryForm: FormGroup;
    itemsSubscription: Subscription;
    items: Item[];

    constructor(private inventoryService: InventoryService) {}

    ngOnInit(): void {
        this.inventoryForm = new FormGroup({
            itemName: new FormControl(null, {
                validators: Validators.required,
            }),
            quantity: new FormControl(null, {
                validators: Validators.required,
            }),
            price: new FormControl(null, { validators: Validators.required }),
        });

        // Get all items
        this.inventoryService.getAllItems();

        // Set up subscription to items
        this.itemsSubscription = this.inventoryService.itemsSubject.subscribe(
            (items: Item[]) => {
                this.items = items;
            }
        );
    }

    ngOnDestroy(): void {
        this.itemsSubscription.unsubscribe();
    }

    onAddItem() {
        this.inventoryService.addItem();
    }
}
