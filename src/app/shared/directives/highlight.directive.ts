import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

//TODO: ExplicacionAqui!

/**
 * @HostListener: Escucha eventos del DOM como mouseenter y mouseleave
 * para cambiar el estilo del componente al que se aplica la directiva.
 * Renderer2: Se usa para modificar el DOM de manera segura (en lugar
 * de acceder directamente a nativeElement).
 *
 * ElementRef es una clase en Angular que te proporciona una referencia
 * directa a un elemento DOM nativo dentro del componente. Es un wrapper
 * sobre el elemento del DOM y te permite manipular
 * directamente el elemento, pero debes tener cuidado al usarlo, ya
 * que acceder al DOM directamente puede tener implicaciones de seguridad.
 */
@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // Cambia el fondo al hacer hover
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '#e0f7fa');
  }

  // Vuelve al color original cuando se retira el mouse
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'white');
  }

  // @HostListener('click') onClick() {
  //   alert('You clicked me!');
  //   this.renderer.setStyle(this.el.nativeElement, 'width', '20%');
  // }
}
