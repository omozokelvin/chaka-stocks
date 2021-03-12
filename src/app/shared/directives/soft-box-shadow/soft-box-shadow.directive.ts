import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appSoftBoxShadow]'
})
export class SoftBoxShadowDirective {
  @HostBinding('style.boxShadow') boxShadow = '0 0 2px rgba(0,0,0,0.1)';
  constructor() { }

}
