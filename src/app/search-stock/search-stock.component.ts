import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-stock',
  templateUrl: './search-stock.component.html',
  styleUrls: ['./search-stock.component.css']
})
export class SearchStockComponent  {

  searchForm = new FormGroup({
                   stockSymbol: new FormControl()
                });

  symbol!: string;

  @Output()
  submit = new EventEmitter<FormGroup>();



  submitForm(): void {
    this.searchForm.markAllAsTouched();

    if(this.searchForm.valid) {
      this.submit.emit(this.searchForm);
    }


  }






}
