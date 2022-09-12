import { Component, EventEmitter, Output } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {StockService} from "../shared/stock.service";

@Component({
  selector: 'app-search-stock',
  templateUrl: './search-stock.component.html',
  styleUrls: ['./search-stock.component.css']
})
export class SearchStockComponent  {

  searchForm = new FormGroup({});


  symbol!: string;

  @Output()
  submit = new EventEmitter<FormGroup>();

  @Output()
  open = new EventEmitter<string>();
  @Output()
  invisible = new EventEmitter<boolean>();

  constructor(private stockService: StockService,
              private formBuilder: FormBuilder) {
    this.constructForm();
  }


  constructForm() {
    this.searchForm = this.formBuilder.group({
      stockSymbol: new FormControl()
    })
  }


  submitForm(): void {
    this.searchForm.markAllAsTouched();
    // this.stockService.setSentiment(false);
    if(this.searchForm.valid) {
      this.submit.emit(this.searchForm);
      this.open.emit("open");
      this.invisible.emit(false);
    }


  }






}
