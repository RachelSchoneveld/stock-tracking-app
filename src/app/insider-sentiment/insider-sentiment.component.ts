import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StockService} from "../shared/stock.service";
import {Stock} from "../domain/stock";
import {InsiderSentiment} from "../domain/insider-sentiment";
import {subMonths} from "date-fns";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-insider-sentiment',
  templateUrl: './insider-sentiment.component.html',
  styleUrls: ['./insider-sentiment.component.css']
})
export class InsiderSentimentComponent implements OnInit, OnDestroy {

  stockSymbol!: string | null;
  insiderSentiment!: InsiderSentiment | null;
  stocks!: Stock[] | undefined;
  subscription!: Subscription;

  constructor(private route: ActivatedRoute,
              private stockService: StockService) {

  }

  private getDateFrom() {
    const today = new Date();
    const date = subMonths(today, 3);
    const year = '' + date.getFullYear()
    let month = '' + date.getMonth();
    const day = '01';
    if (month.length < 2) {
      month = '0' + month;
    }
    return year + '-' + month + '-' + day;
  }

  private getDateTo() {
    const today = new Date();
    const year = '' + today.getFullYear();
    let month = '' + today.getMonth();
    if (month.length < 2) {
      month = '0' + month;
    }
    const day = '01';

    return year + '-' + month + '-' + day;
  }


  getMonth(month: number): string {
    const months = ["January", "Feberuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return months[month-1];
  }

  upwardTrend(stock: Stock): boolean {
    return stock.change > 0;
  }

  ngOnInit(): void {
    this.stockSymbol = this.route.snapshot.params['stockSymbol'];
    let symbol;
    let startDate = this.getDateFrom();
    let endDate= this.getDateTo();
    if(this.stockSymbol) {
      symbol = this.stockSymbol.trim().toUpperCase();
      this.subscription = this.stockService.getSentimentLastThreeMonths(symbol, startDate, endDate).subscribe(
        sentiment => {
          this.insiderSentiment = sentiment;
          this.stocks = this.insiderSentiment?.data;
        });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}
