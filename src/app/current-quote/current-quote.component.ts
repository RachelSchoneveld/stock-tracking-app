import {Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output, OnDestroy} from '@angular/core';
import {DataService} from "../shared/data.service";
import {StockService} from "../shared/stock.service";
import {Quote} from "../domain/quote";
import {CurrentQuote} from "../domain/current-quote";
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
  searchForm!: FormGroup;
  @Output()
  close = new EventEmitter<string>();
  @Output()
  hidden = new EventEmitter<boolean>();
  currentQuotes: CurrentQuote[] = [];
  stockSymbol!: string;
  title!: string;
  quote!: Quote;
  formValue!: Formvalue;
  subscription!: Subscription;
  quoteIndex!: number;
  hidePanel: boolean[] = [];




  constructor(private dataService: DataService,
              private stockService: StockService) { }

  ngOnInit(): void {
    this.hidePanel.forEach(() => {
      this.hidePanel.push(false);
    })
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges['searchForm']?.currentValue) {
      if(this.searchForm){
        this.formValue = this.searchForm.value;
        if (this.formValue) {
          const symbol = this.formValue.stockSymbol;
          this.subscription = this.stockService.getRealtimeQuote(symbol.trim().toUpperCase()).subscribe(value => {
            this.quote = value;
            const currentQuote = new CurrentQuote();
            currentQuote.stockQuote = this.quote;
            this.stockSymbol = symbol.trim().toUpperCase();
            currentQuote.stockSymbol = this.stockSymbol;
            currentQuote.trend = this.showArrow(this.quote);
            this.addToDataStore(currentQuote)
          });
        }
      }

      this.currentQuotes = this.dataService.retrieveDataStore();
    }
  }




  private addToDataStore(currentQuote: CurrentQuote) {

    this.dataService.addToDataStore(currentQuote);
  }

  showArrow(quote: Quote): boolean {
    if(quote.c > quote.o) {
      return  true;
    } else if (quote.c < quote.o){
      return false;
    }
    return false;
  }

  closePanel(i: number) {
    this.hidePanel[i] =!this.hidePanel[i];

  }

  showInsiderSentiment() {
    this.close.emit("close");
    this.stockService.setSentiment(true);
    this.hidden.emit(false);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
