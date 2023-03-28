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
export class InventoryListComponent implements OnInit {
    inventoryForm: FormGroup;
    items: Item[];
    errMsg: string;

    constructor(private inventoryService: InventoryService) {}

    ngOnInit(): void {
        this.inventoryForm = new FormGroup({
            productName: new FormControl(null, {
                validators: Validators.required,
            }),
            productQuantity: new FormControl(null, {
                validators: Validators.required,
            }),
            productPrice: new FormControl(null, {
                validators: Validators.required,
            }),
        });

        // Get all items
        this.inventoryService.getAllItems().subscribe({
            next: (items: Item[]) => {
                this.items = items;
            },
            error: (err: Error) => {
                this.errMsg = err.message;
            },
        });
    }

    onAddItem() {
        const newItem: Item = this.inventoryForm.value;
        newItem.productPrice = Math.floor(newItem.productPrice * 100);

        this.inventoryService.addItem(newItem).subscribe({
            next: () => {},
            error: (err: Error) => {
                this.errMsg = err.message;
            },
        });

        this.inventoryForm.reset();
    }
}
