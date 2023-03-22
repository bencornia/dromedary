import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryEditComponent } from './inventory-edit/inventory-edit.component';
import { InventoryComponent } from './inventory.component';

const routes: Routes = [
    {
        path: 'inventory',
        component: InventoryComponent,
    },
    { path: 'inventory/edit/:id', component: InventoryEditComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InventoryRoutingModule {}
