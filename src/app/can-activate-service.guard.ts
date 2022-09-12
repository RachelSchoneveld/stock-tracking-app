import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {StockService} from "./shared/stock.service";

@Injectable({
  providedIn: 'root'
})
export class CanActivateService implements CanActivate {

  constructor(private stockService: StockService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.stockService.showSentiment();
  }

}
