import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as urls from '../util/urls';
import {Quote} from "../domain/quote";
import {Observable, of} from "rxjs";
import {InsiderSentiment} from "../domain/insider-sentiment";
import {environment} from "../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class StockService {



  private showsSentiment: boolean = false;

  constructor(private http: HttpClient) { }

  private finnHubKey = 'bu4f8kn48v6uehqi3cqg';



  private headers = new HttpHeaders({
    'observe': 'body',
    'Accept': 'application/json',
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'X-Requested-With': 'XMLHttpRequest',
    'X-Finnhub-Token': this.finnHubKey
  });



  getRealtimeQuote(stock: string): Observable<Quote>{
    const url = `${environment.API_URL}${urls.realTimeQuoteUrl(stock)}`;
    return this.http.get<Quote>(url, {headers: this.headers});
  }

    getSentimentLastThreeMonths(stock: string | null, startDate: string, endDate: string): Observable<InsiderSentiment | null> {
    if(stock) {
      const url = `${environment.API_URL}${urls.insiderSentimentUrl(stock, startDate, endDate)}`;
      return this.http.get<InsiderSentiment>(url, {headers: this.headers});
    }
    return of(null);
  }

  setSentiment(show: boolean) {
    this.showsSentiment = show;
  }

  showSentiment() {
    return this.showsSentiment;
  }


}
