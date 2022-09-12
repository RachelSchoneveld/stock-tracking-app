import {Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output, OnDestroy} from '@angular/core';
import {DataService} from "../shared/data.service";
import {StockService} from "../shared/stock.service";
import {Quote} from "../domain/quote";
import {CurrentQuote} from "../domain/current-quote";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {Formvalue} from "../domain/formvalue";
import {Subscription} from "rxjs";




@Component({
  selector: 'app-current-quote',
  templateUrl: './current-quote.component.html',
  styleUrls: ['./current-quote.component.css']
})
export class CurrentQuoteComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  formGroup!: FormGroup;
  stockSymbol: string = '';
  quote!: Quote;
  result!: string;
  showUpward: boolean = false;
  @Output()
  close = new EventEmitter<string>();
  @Output()
  showStocks = new EventEmitter<CurrentQuote[]>();
  currentQuotes: CurrentQuote[] = [];
  found!: boolean;
  formValue!: Formvalue;
  subscription!: Subscription;




  constructor(private dataService: DataService,
              private stockService: StockService,
              private router: Router) { }

  ngOnInit(): void {

  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges['formGroup']?.currentValue) {
      this.formValue = this.formGroup.value;

      if (this.formValue?.stockSymbol) {
        this.currentQuotes = this.dataService.retrieveDataStore();

          this.stockSymbol = this.formValue.stockSymbol.trim().toUpperCase();

        this.subscription = this.stockService.getRealtimeQuote(this.stockSymbol).subscribe(value => {
            this.quote = value;
            this.showArrow(this.quote);
            this.addToDataStore()
          });



      }
    }
  }




  private addToDataStore() {
    let currentQuote = new CurrentQuote();
    currentQuote.stockSymbol = this.stockSymbol;
    currentQuote.stockQuote = this.quote;
    currentQuote.trend = this.showUpward;
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
    this.showStocks.emit(this.currentQuotes);
  }

  showInsiderSentiment() {
    this.closeQoutePanel();
    this.close.emit("close");
    this.stockService.setSentiment(true);
    this.router.navigate(['/sentiment', this.stockSymbol]);
  }

  findCurrentQuoteInDataStore(currentQuote: CurrentQuote) {
    const stockQuote = this.currentQuotes
      .find(currQuote => currQuote.stockSymbol === currentQuote.stockSymbol);
    if(stockQuote){
      this.found = true;
    }
    this.found = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
