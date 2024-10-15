import {
  Injectable,
  ComponentFactoryResolver,
  ViewContainerRef,
  Type,
  Output,
} from '@angular/core';
import { CardComponent } from '../card/card.component'; // Usa la ruta correcta del CardComponent

@Injectable({
  providedIn: 'root',
})
export class ComponentGeneratorService {
  // TODO: ExoplicacionAqui!
  /**
   * ComponentFactoryResolver: Es una clase de Angular que permite
   * crear instancias de componentes de manera dinámica. En el
   * constructor, se inyecta este resolver para poder generar
   * componentes a partir de la fábrica de componentes.
   *
   */

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  generateComponent<T>(
    // Esta es la ref al contenedor donde se inyectará el componente
    viewContainerRef: ViewContainerRef,
    component: Type<T>,
    inputs: Partial<T> = {}
  ): void {
    const factory =
      this.componentFactoryResolver.resolveComponentFactory(component);
    /**
     * Antes de inyectar el nuevo componente, limpia el contenedor de
     * cualquier contenido anterior. Esto es útil si deseas que solo
     * haya un componente dinámico en ese contenedor en un momento dado.
     */
    viewContainerRef.clear();
    /**
     * Se crea la instancia y se usan los datos que queramos
     */
    const componentRef = viewContainerRef.createComponent(factory);
    // Esto se usaría si solo tuviéramos title y description como inputs en vez
    // de un objeto con todas las propiedades

    // componentRef.instance.title = title;
    // componentRef.instance.description = description;

    // Object.keys(inputs).forEach((key) => {
    //   const value = inputs[key as keyof T]; // Accedemos al valor
    //   if (value !== undefined) {
    //     (componentRef.instance as T)[key as keyof T] = value;
    //   }
    // });

    //Si queremos permitir que sean opcionales, es decir undefined
    Object.keys(inputs).forEach((key) => {
      (componentRef.instance as Partial<T>)[key as keyof T] =
        inputs[key as keyof T];
    });

    // Escuchar el evento emitido por el componente hijo

    if (componentRef.instance instanceof CardComponent) {
      componentRef.instance.cardClicked.subscribe(() => {
        console.log('Card clicked!');
      });
    }
  }
}
