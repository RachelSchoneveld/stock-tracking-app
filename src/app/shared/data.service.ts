import { Injectable } from '@angular/core';
import {Quote} from "../domain/quote";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  dataStore: Quote[] = [];

  addToDataStore(quote: Quote) {
    this.dataStore.push(quote);
  }

  retrieveDataStore(): Quote[] {
    return this.dataStore;
  }
}
