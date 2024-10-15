import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { SearchRoutingModule } from './search-routing.module';
import { CardModule } from '../shared/card/card.module'; // Importa el módulo de Card
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, SearchRoutingModule, CardModule, IonicModule], // Añade el módulo de Card
})
export class SearchModule {}
