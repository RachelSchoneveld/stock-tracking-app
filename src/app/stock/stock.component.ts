import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Quote} from "../domain/quote";

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnChanges, OnInit {

  @Input()
  quote!: Quote;
  @Input()
  symbol!: string;
  @Input()
  trend!: boolean;
  @Output()
  close = new EventEmitter<string>();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
  }



  closeStockPanel() {
    this.close.emit("close");
  }
}
