import {Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StockService} from "../shared/stock.service";
import {Stock} from "../domain/stock";

@Component({
  selector: 'app-insider-sentiment',
  templateUrl: './insider-sentiment.component.html',
  styleUrls: ['./insider-sentiment.component.css']
})
export class InsiderSentimentComponent implements OnInit, OnChanges {

  @Output()
  close = new EventEmitter<string>();
  symbol!: string;
  stocks!: Stock[];

  constructor(private route: ActivatedRoute,
              private stockService: StockService) { }

  ngOnInit(): void {
    this.close.emit("close");

    this.symbol = this.route.snapshot.params['stockSymbol'];

    this.stockService.getSentimentLastThreeMonths(this.symbol).subscribe(
      stocks => {
        this.stocks = stocks;
      }
    )
  }

  ngOnChanges(simpleChanges: SimpleChanges) {

  }

}
