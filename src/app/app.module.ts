import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchStockComponent } from './search-stock/search-stock.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlphabeticDirective } from './shared/alphabetic.directive';
import { CurrentQuoteComponent } from './current-quote/current-quote.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    SearchStockComponent,
    AlphabeticDirective,
    CurrentQuoteComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
    ],
  exports: [
  ],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
