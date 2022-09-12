import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchStockComponent } from './search-stock/search-stock.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlphabeticDirective } from './shared/alphabetic.directive';
import { CurrentQuoteComponent } from './current-quote/current-quote.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { InsiderSentimentComponent } from './insider-sentiment/insider-sentiment.component';
import { StockComponent } from './stock/stock.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchStockComponent,
    AlphabeticDirective,
    CurrentQuoteComponent,
    InsiderSentimentComponent,
    StockComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
  exports: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
