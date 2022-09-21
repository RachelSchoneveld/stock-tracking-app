import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as urls from '../util/urls';
import {Quote} from "../stocks/domain/quote";
import {InsiderSentiment} from "../stocks/domain/insider-sentiment";
import {Observable} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class StockService {



  private showsSentiment: boolean = false;

  constructor(private http: HttpClient) { }

  private finnHubKey = 'bu4f8kn48v6uehqi3cqg';



  private headers = new HttpHeaders({
    'observe': 'body',
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'X-Finnhub-Token': this.finnHubKey
  });



  getRealtimeQuote(stock: string): Observable<Quote>{
    const url = urls.realTimeQuoteUrl(stock);
    return this.http.get<Quote>(url, {headers: this.headers});
  }

  getSentimentLastThreeMonths(stock: string, startDate: string, endDate: string): Observable<InsiderSentiment> {
      const url = urls.insiderSentimentUrl(stock, startDate, endDate);
      return this.http.get<InsiderSentiment>(url, {headers: this.headers});
  }

  setSentiment(show: boolean) {
    this.showsSentiment = show;
  }

  showSentiment() {
    return this.showsSentiment;
  }


}
