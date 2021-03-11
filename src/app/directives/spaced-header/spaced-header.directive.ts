import { Directive, ElementRef, HostBinding, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSpacedHeader]'
})

export class SpacedHeaderDirective {

  @HostBinding('style.fontWeight') fontWeight = 'normal';
  @HostBinding('style.fontSize') fontSize = '0.7rem';
  @HostBinding('style.textTransform') textTransform = 'uppercase';
  @HostBinding('style.letterSpacing') letterSpacing = '0.2rem';

  // constructor(private elementReference: ElementRef,
  //   private renderer: Renderer2) { }

  // ngOnInit(): void {
  //   // this.renderer.setStyle(this.elementReference.nativeElement, 'font-weight', 'normal');
  //   // this.renderer.setStyle(this.elementReference.nativeElement, 'font-size', '0.2rem');
  // }

}
