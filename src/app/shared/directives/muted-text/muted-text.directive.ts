import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appMutedText]'
})
export class MutedTextDirective {

  @Input('appMutedText') defaultSize = '0.8rem';

  @HostBinding('style.color') fontColor = '#b4b4b4';
  @HostBinding('style.fontSize') fontSize: string = '';

  constructor() { }

  ngOnInit(): void {
    this.fontSize = this.defaultSize;
  }

}
