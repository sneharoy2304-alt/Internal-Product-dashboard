import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[appOnSaleHighlight]',
})
export class OnSaleHighlightDirective {
  // whether the host element is representing a sale product
  @Input('appOnSaleHighlight') onSale = false;

  // add a class when on sale so that styling can be applied
  @HostBinding('class.sale') get saleClass() {
    return this.onSale;
  }

  // also provide a visual border highlight
  @HostBinding('style.border') get saleBorder() {
    return this.onSale ? '2px solid crimson' : '';
  }

  constructor() {}
}
