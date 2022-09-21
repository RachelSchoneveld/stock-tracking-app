import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchStockComponent } from './stocks/search-stock/search-stock.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrentQuoteComponent } from './stocks/current-quote/current-quote.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { InsiderSentimentComponent } from './stocks/insider-sentiment/insider-sentiment.component';
import { HomeComponent } from './stocks/home.component';
import { PageNotFoundComponent } from './core/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchStockComponent,
    CurrentQuoteComponent,
    InsiderSentimentComponent,
    HomeComponent,
    PageNotFoundComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
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
