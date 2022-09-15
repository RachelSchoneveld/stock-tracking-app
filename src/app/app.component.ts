import {Component} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {CurrentQuote} from "./domain/current-quote";
import {StockService} from "./shared/stock.service";
import {Router} from "@angular/router";
import {Formvalue} from "./domain/formvalue";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stock-tracking-app';
  stockSymbol: string = '';
  searchForm!: FormGroup;
  formValue!: Formvalue;
  showCurrentQuotes: boolean = true;
  showStock: boolean = false;
  showThisStock: boolean = false;
  listOfStocks!: CurrentQuote[];
  buttonHidden: boolean = true;


  constructor(private stockService: StockService,
              private router: Router) {
  }


  submit(event: FormGroup): void {
    this.searchForm = event;
  }

  closeQuote(event: string){
    if(event === "close"){
      this.showCurrentQuotes = false;
    }
  }

  closeStock(event: string){
    if(event === "close"){
      this.showThisStock = false;
    }
  }

  // fillStocks($event: CurrentQuote[]) {
  //   this.listOfStocks = $event;
  //
  // }

  openQuote(event: string) {
    if(event === "open") {
      this.showCurrentQuotes = true;
    }
  }

  closeSentimentPanel() {
    this.stockService.setSentiment(false);
  }

  showListOfStocks() {
    this.showStock = true;
    this.showCurrentQuotes = true;
    this.router.navigate(['/']);
    this.buttonHidden = true;
  }

  setStockListButtonVisisble(event: boolean) {
    this.buttonHidden = event;
  }



}
