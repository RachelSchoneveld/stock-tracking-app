import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormValue } from '../domain/formvalue';
import {DataService} from "../shared/data.service";
import {StockService} from "../shared/stock.service";
import {Quote} from "../domain/quote";


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



  constructor(private dataService: DataService,
              private stockService: StockService) { }

  ngOnInit(): void {

  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if(simpleChanges['formGroup']?.currentValue) {

      this.formValue = this.formGroup.value;

      if(this.formValue) {
        this.stockSymbol = this.formValue.stockSymbol;

        this.stockService.getRealtimeQuote(this.stockSymbol.trim().toUpperCase()).subscribe( q => {
          this.quote = q;

          this.dataService.addToDataStore(this.quote);
        })
      }
    }


  }


}
