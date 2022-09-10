import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as urls from '../util/urls';
import {Quote} from "../domain/quote";
import {subMonths} from "date-fns";
import {Stock} from "../domain/stock";

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  private finnHubApiKey = 'bu4f8kn48v6uehqi3cqg';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Finnhub-Token': this.finnHubApiKey
  });

  getRealtimeQuote(stock: string) {
    const url = urls.realTimeQuoteUrl(stock);
    return this.http.get<Quote>(url, {headers: this.headers})
  }

  getSentimentLastThreeMonths(stock: string) {
    const today = this.dateFormat(new Date());
    const threeMonthAgo = this.dateFormat(subMonths(new Date(), 3));
    const url = urls.insiderSentimentUrl(stock, today, threeMonthAgo);
    return this.http.get<Stock>(url, {headers: this.headers});

  }

  private dateFormat(date: Date): string {
    const year = '' + date.getFullYear();
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return year + '-' + month + '-' + day;
  }
}
