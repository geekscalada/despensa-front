import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { HomeModule } from '../home/home.module';
import { LibraryComponent } from './library/library.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [LibraryComponent],
  imports: [CommonModule, LibraryRoutingModule, IonicModule],
})
export class LibraryModule {}
