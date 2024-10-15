import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  Input,
} from '@angular/core';

//TODO: ExplicacionAqui!

@Directive({
  selector: '[appDynamicBehavior]',
})
export class DynamicBehaviorDirective {
  // Propiedades que se pueden modificar desde el componente y que
  // serán inyectadas en la directiva

  @Input() highlightColor: string = 'yellow';
  @Input() clickMessage: string = 'Clicked!';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // Modificar el estilo en el hover
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'backgroundColor',
      this.highlightColor
    );
  }

  // Volver al estilo original cuando el mouse sale
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'white');
  }

  // Cambiar el texto al hacer click
  @HostListener('click') onClick() {
    this.renderer.setProperty(
      this.el.nativeElement,
      'innerText',
      this.clickMessage
    );
  }
}
