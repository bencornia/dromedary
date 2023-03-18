import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InventoryModule } from './inventory/inventory.module';
import { AccountModule } from './account/account.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccountModule,
    InventoryModule,
    AccountModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
