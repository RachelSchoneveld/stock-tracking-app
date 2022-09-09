import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-stock',
  templateUrl: './search-stock.component.html',
  styleUrls: ['./search-stock.component.css']
})
export class SearchStockComponent  {

  form!: FormGroup;
  stockSymbol = new FormControl(null, Validators.required);


  constructor() {
    this.constructForm();
   }

   
  

  


  submitForm() {

  }

  private constructForm() {
    this.form = new FormGroup({});
    this.form.addControl('stockSymbol', this.stockSymbol);
  }
  




}
