import {Component} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {CurrentQuote} from "./domain/current-quote";
import {StockService} from "./shared/stock.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stock-tracking-app';
  stockSymbol: string = '';
  formGroup!: FormGroup;
  showCurrentQuote: boolean = true;
  showStock: boolean = false;
  showThisStock: boolean = false;
  listOfStocks!: CurrentQuote[];
  buttonHidden: boolean = false;


  constructor(private stockService: StockService,
              private router: Router) {
  }


  submit(event: FormGroup): void {
    this.formGroup = event;
  }

  closeQuote(event: string){
    if(event === "close"){
      this.showCurrentQuote = false;
    }
  }

  closeStock(event: string){
    if(event === "close"){
      this.showThisStock = false;
    }
  }

  fillStocks($event: CurrentQuote[]) {
    this.listOfStocks = $event;

  }

  openQuote(event: string) {
    if(event === "open") {
      this.showCurrentQuote = true;
    }
  }

  closeSentimentPanel() {
    this.stockService.setSentiment(false);
  }

  showListOfStocks() {
    this.showStock = true;
    this.showThisStock =true;
    this.router.navigate(['/']);
    this.buttonHidden = true;
  }

  setStockListButtonVisisble(event: boolean) {
    this.buttonHidden = event;
  }



}
