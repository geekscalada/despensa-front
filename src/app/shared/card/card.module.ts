import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { IonicModule } from '@ionic/angular';
import { HighlightDirective } from '@shared/directives/highlight.directive';
import { CapitalizePipe } from '@shared/pipes/capitalize.pipe';
import { DynamicBehaviorDirective } from '@shared/directives/dynamic-behavior.directive';

@NgModule({
  declarations: [
    CardComponent,
    HighlightDirective,
    CapitalizePipe,
    DynamicBehaviorDirective,
  ],
  imports: [CommonModule, IonicModule],
  exports: [CardComponent],
})
export class CardModule {}
