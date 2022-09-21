import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Formvalue} from "./domain/formvalue";
import {CurrentQuote} from "./domain/current-quote";
import {StockService} from "../shared/stock.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  stockSymbol: string = '';
  searchForm!: FormGroup;
  formValue!: Formvalue;
  listOfStocks!: CurrentQuote[];


  constructor(private stockService: StockService) {
  }


  submit(event: FormGroup): void {
    this.searchForm = event;
  }



  closeSentimentPanel() {
    this.stockService.setSentiment(false);
  }


}
