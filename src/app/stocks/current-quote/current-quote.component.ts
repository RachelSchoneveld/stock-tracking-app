import {Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy} from '@angular/core';
import {DataService} from "../../shared/data.service";
import {StockService} from "../../shared/stock.service";
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
  currentQuotes: CurrentQuote[] = [];
  stockSymbol!: string;
  quote!: Quote;
  formValue!: Formvalue;
  subscription!: Subscription;
  hidePanel: boolean[] = [];




  constructor(private dataService: DataService,
              private stockService: StockService) { }

  ngOnInit(): void {
    this.currentQuotes = this.dataService.retrieveDataStore();
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
            const currentQuote = this.fillCurrentQuote(symbol);
            this.addToDataStore(currentQuote)
          });
        }
      }

      this.currentQuotes = this.dataService.retrieveDataStore();
    }
  }


  private fillCurrentQuote(symbol: string) {
    const currentQuote = new CurrentQuote();
    currentQuote.stockQuote = this.quote;
    this.stockSymbol = symbol.trim().toUpperCase();
    currentQuote.stockSymbol = this.stockSymbol;
    currentQuote.trend = this.showUpOrDownArrow(this.quote);
    return currentQuote;
  }

  private addToDataStore(currentQuote: CurrentQuote) {

    this.dataService.addToDataStore(currentQuote);
  }

  showUpOrDownArrow(quote: Quote): boolean {
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
    this.stockService.setSentiment(true);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
