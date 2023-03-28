import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryItemComponent } from './inventory-list/inventory-item/inventory-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventoryDetailComponent } from './inventory-detail/inventory-detail.component';

@NgModule({
    declarations: [
        InventoryComponent,
        InventoryListComponent,
        InventoryItemComponent,
        InventoryDetailComponent,
    ],
    imports: [
        CommonModule,
        InventoryRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class InventoryModule {}
