import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-stock',
  templateUrl: './search-stock.component.html',
  styleUrls: ['./search-stock.component.css']
})
export class SearchStockComponent  {

  searchForm!: FormGroup;
  symbol!: string;

  @Output()
  submit = new EventEmitter<FormGroup>();


  constructor() {
    this.constructForm();
   }


  submitForm(): void {
    this.searchForm.markAllAsTouched();

    if(this.searchForm.valid) {
      this.submit.emit(this.searchForm);
    }


  }

  private constructForm() {
    this.searchForm = new FormGroup({
      stockSymbol: new FormControl()
    });

  }





}
