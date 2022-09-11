import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as urls from '../util/urls';
import {subMonths,lastDayOfMonth} from "date-fns";
import {Stock} from "../domain/stock";
import {Quote} from "../domain/quote";
import {Observable} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class StockService {





  constructor(private http: HttpClient) { }

  private finnHubKey = 'bu4f8kn48v6uehqi3cqg';



  private headers = new HttpHeaders({
    'observe': 'body',
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'X-Requested-With': 'XMLHttpRequest',
    'X-Finnhub-Token': this.finnHubKey
  });



  getRealtimeQuote(stock: string): Observable<Quote>{
    const url = urls.realTimeQuoteUrl(stock);
    return this.http.get<Quote>(url, {headers: this.headers});
  }

  getSentimentLastThreeMonths(stock: string): Observable<Stock[]> {
    const startDate = this.getDateFrom();
    const endDate = this.getDateTo()
    const url = urls.insiderSentimentUrl(stock, startDate, endDate);
    return this.http.get<Stock[]>(url, {headers: this.headers});
  }

  private getDateFrom() {
    const date = subMonths(new Date(), 1);
    const year = '' + date.getFullYear()
    let month = '' + date.getMonth();
    const day = '' + lastDayOfMonth(date);
    if (month.length < 2) {
      month = '0' + month;
    }
    return year + '-' + month + '-' + day;
  }

  private getDateTo() {
    const date = subMonths(new Date(), 3);
    const year = '' + date.getFullYear();
    let month = '' + date.getMonth();
    if (month.length < 2) {
      month = '0' + month;
    }
    const day = '01';

    return year + '-' + month + '-' + day;
  }


}
