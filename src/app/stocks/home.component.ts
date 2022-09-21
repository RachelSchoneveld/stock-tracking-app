import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Formvalue} from "./domain/formvalue";
import {StockService} from "../shared/stock.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  searchForm!: FormGroup;
  formValue!: Formvalue;


  constructor(private stockService: StockService) {
  }


  submit(event: FormGroup): void {
    this.searchForm = event;
  }



  closeSentimentPanel() {
    this.stockService.setSentiment(false);
  }


}
