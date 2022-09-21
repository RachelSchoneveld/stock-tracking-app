import { Injectable } from '@angular/core';
import {CurrentQuote} from "../stocks/domain/current-quote";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  dataStore: CurrentQuote[] = [];

  addToDataStore(currentQuote: CurrentQuote) {
    this.dataStore.push(currentQuote);
  }

  retrieveDataStore(): CurrentQuote[] {
    return this.dataStore;
  }
}
