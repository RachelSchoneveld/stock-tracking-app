import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphabetic]'
})
export class AlphabeticDirective {

  regex = '^[a-zA-Z]*$';

  constructor() { }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: any) {
    return new RegExp(this.regex).test(event.key);
  }

}
