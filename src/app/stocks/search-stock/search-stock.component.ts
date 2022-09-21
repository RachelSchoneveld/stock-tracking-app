import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StockService} from "../../shared/stock.service";

@Component({
  selector: 'app-search-stock',
  templateUrl: './search-stock.component.html',
  styleUrls: ['./search-stock.component.css']
})
export class SearchStockComponent implements OnInit{

  searchForm!: FormGroup;

  @Output()
  submit = new EventEmitter<FormGroup>();

  constructor(private stockService: StockService,
              private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      stockSymbol: new FormControl('', Validators.compose([
        Validators.min(1),
        Validators.max(5),
        Validators.pattern('^[a-zA-Z]*$')]))
    })

  }

  ngOnInit(): void {

    }



  submitForm(): void {
    this.searchForm.markAllAsTouched();
    if(this.searchForm.valid) {
      this.submit.emit(this.searchForm);
    }


  }






}
