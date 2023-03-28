import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryDetailComponent } from './inventory-detail/inventory-detail.component';
import { InventoryComponent } from './inventory.component';

const routes: Routes = [
    {
        path: 'inventory',
        component: InventoryComponent,
    },
    {
        path: 'inventory/detail/:index',
        component: InventoryDetailComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InventoryRoutingModule {}
