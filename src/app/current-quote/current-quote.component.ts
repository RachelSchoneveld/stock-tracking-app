import { FormGroup } from '@angular/forms';
import {Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output} from '@angular/core';
import { FormValue } from '../domain/formvalue';
import {DataService} from "../shared/data.service";
import {StockService} from "../shared/stock.service";
import {Quote} from "../domain/quote";
import {CurrentQuote} from "../domain/current-quote";
import {Router} from "@angular/router";




@Component({
  selector: 'app-current-quote',
  templateUrl: './current-quote.component.html',
  styleUrls: ['./current-quote.component.css']
})
export class CurrentQuoteComponent implements OnInit, OnChanges {

  @Input()
  formGroup!: FormGroup;
  formValue!: FormValue;
  stockSymbol!: string;
  quote!: Quote;
  result!: string;
  showUpward: boolean = false;
  @Output()
  close = new EventEmitter<string>();
  currentQuotes: CurrentQuote[] = [];
  found!: boolean;




  constructor(private dataService: DataService,
              private stockService: StockService,
              private router: Router) { }

  ngOnInit(): void {

  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges['formGroup']?.currentValue) {

      this.formValue = this.formGroup.value;

      if (this.formValue) {
        this.stockSymbol = this.formValue.stockSymbol;
        this.currentQuotes = this.dataService.retrieveDataStore();

        this.stockService.getRealtimeQuote(this.stockSymbol.trim().toUpperCase()).subscribe( value => {
          this.quote = value;
          this.showArrow(this.quote);
          this.addToDataStore();
        });


      }
    }
  }


  private addToDataStore() {
    let currentQuote = new CurrentQuote();
    currentQuote.stockSymbol = this.stockSymbol;
    currentQuote.stockQuote = this.quote;
    this.findCurrentQuoteInDataStore(currentQuote);
    if (!this.found) {
      this.dataService.addToDataStore(currentQuote);
    }
  }

  showArrow(quote: Quote) {
    if(quote.c > quote.o) {
      this.showUpward = true;
    } else if (quote.c < quote.o){
      this.showUpward = false;
    }

  }

  closeQoutePanel() {
    this.close.emit("close");
  }

  findCurrentQuoteInDataStore(currentQuote: CurrentQuote) {
    const stockQuote = this.currentQuotes
      .find(currQuote => currQuote.stockSymbol === currentQuote.stockSymbol);
    if(stockQuote){
      this.found = true;
    }
    this.found = false;
  }


  insiderSentiment() {
    this.router.navigate(['/sentiment', this.stockSymbol]);
  }
}
