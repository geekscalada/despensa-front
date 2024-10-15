import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentGeneratorService } from '../../shared/services/ComponentGeneratorService'; // Asegúrate de usar la ruta correcta
import { CardComponent } from '@shared/card/card.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  //TODO: ExplicacionAqui!
  /**
   *  Es un decorador en Angular que te permite acceder a un elemento
   * del DOM o a un componente hijo dentro de una plantilla Angular
   * desde el código TypeScript. En este caso, estamos accediendo a
   * un contenedor (div) que tiene un #cardContainer en la plantilla
   * HTML de search.component.html.
   * Aquí estamos diciendo que Angular debe buscar el elemento con el
   * template reference variable #cardContainer en el HTML, y obtener
   * su ViewContainerRef, que es una referencia que te permite inyectar
   * componentes dinámicamente en el DOM
   */
  @ViewChild('cardContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  constructor(private componentGeneratorService: ComponentGeneratorService) {}

  addCard(): void {
    this.componentGeneratorService.generateComponent(
      this.container,
      CardComponent,
      {
        title: 'Dynamic Title',
        description: 'Generated dynamically!',
      }
    );
  }
}
