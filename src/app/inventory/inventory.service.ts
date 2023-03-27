import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from './item.model';

@Injectable({ providedIn: 'root' })
export class InventoryService {
    itemsSubject = new Subject<Item[]>();

    addItem() {}
}
