import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../inventory.service';
import { Item } from '../item.model';

@Component({
    selector: 'app-inventory-detail',
    templateUrl: './inventory-detail.component.html',
    styleUrls: ['./inventory-detail.component.css'],
})
export class InventoryDetailComponent implements OnInit {
    inventoryForm: FormGroup;
    itemIndex: number;
    item: Item;

    constructor(
        private activatedRoute: ActivatedRoute,
        private inventoryService: InventoryService,
        private router: Router
    ) {}

    ngOnInit() {
        // Get inventory id
        this.itemIndex = +this.activatedRoute.snapshot.paramMap.get('index');
        this.item = this.inventoryService.getItem(this.itemIndex);

        // Initialize form
        this.inventoryForm = new FormGroup({
            productName: new FormControl(this.item.productName, {
                validators: Validators.required,
            }),
            productQuantity: new FormControl(this.item.productQuantity, {
                validators: Validators.required,
            }),
            productPrice: new FormControl(
                (this.item.productPrice / 100).toFixed(2),
                {
                    validators: Validators.required,
                }
            ),
        });
    }

    onDeleteItem() {
        this.inventoryService.deleteItem(this.itemIndex);
    }

    onUpdateItem() {
        const newItem: Item = this.inventoryForm.value;
        newItem.productPrice = Math.floor(newItem.productPrice * 100);

        this.inventoryService.updateItem(this.itemIndex, newItem);
    }
}
