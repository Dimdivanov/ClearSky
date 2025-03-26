import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightMenu]',
  standalone: true,
})
export class HighlightMenuDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.setUnderline();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.removeUnderline();
  }

  private setUnderline() {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      'textDecoration',
      'underline'
    );
  }
  private removeUnderline() {
    this.renderer.removeStyle(this.elRef.nativeElement, 'textDecoration');
  }
}
