import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../inventory.service';

@Component({
    selector: 'app-inventory-list',
    templateUrl: './inventory-list.component.html',
    styleUrls: ['./inventory-list.component.css'],
})
export class InventoryListComponent implements OnInit {
    inventoryForm: FormGroup;

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
    }

    onAddItem() {
        this.inventoryService.addItem();
    }
}
