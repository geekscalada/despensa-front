import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface ClickableComponent {
  cardClicked: EventEmitter<void>;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements ClickableComponent {
  /**
   * Inputs de padres a hijos, outpouts de hijos a padres
   */
  @Input() title: string = '';
  @Input() description: string = '';

  // TODO: ExplicacionAqui!
  /**
   * Es una propiedad de la clase CardComponent de tipo EventEmitter que emite un evento de tipo void.
   *
   */
  @Output() cardClicked = new EventEmitter<void>();

  onClick(): void {
    this.cardClicked.emit();
  }
}
