import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stock-tracking-app';
  stockSymbol: string = '';
  formGroup!: FormGroup;
  showCurrentQuote: boolean = true;


  submit(event: FormGroup): void {
    this.formGroup = event;
  }

  closeQuote(event: string){
    this.showCurrentQuote = false;
  }


}
