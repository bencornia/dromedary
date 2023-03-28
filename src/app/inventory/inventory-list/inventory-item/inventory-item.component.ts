import { Component, Input } from '@angular/core';
import { Item } from '../../item.model';

@Component({
    selector: 'app-inventory-item',
    templateUrl: './inventory-item.component.html',
    styleUrls: ['./inventory-item.component.css'],
})
export class InventoryItemComponent {
    @Input() item: Item;
    @Input() index: number;
}
