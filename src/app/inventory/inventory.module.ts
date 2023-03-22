import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryEditComponent } from './inventory-edit/inventory-edit.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryItemComponent } from './inventory-list/inventory-item/inventory-item.component';

@NgModule({
    declarations: [
        InventoryComponent,
        InventoryEditComponent,
        InventoryListComponent,
        InventoryItemComponent,
    ],
    imports: [CommonModule, InventoryRoutingModule],
})
export class InventoryModule {}
