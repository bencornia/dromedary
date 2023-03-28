import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from '../inventory.service';
import { Item } from '../item.model';

@Component({
    selector: 'app-inventory-detail',
    templateUrl: './inventory-detail.component.html',
    styleUrls: ['./inventory-detail.component.css'],
})
export class InventoryDetailComponent implements OnInit {
    inventoryForm: FormGroup;
    itemId: number;
    item: Item;

    constructor(
        private activatedRoute: ActivatedRoute,
        private inventoryService: InventoryService
    ) {}

    ngOnInit() {
        // Get inventory id
        this.itemId = +this.activatedRoute.snapshot.paramMap.get('id');
        this.item = this.inventoryService.items[this.itemId];

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
}
