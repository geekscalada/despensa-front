import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // IonicModule correctamente importado

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';

/**
 * Normally we don't need import IonicModule when we imported it in app.module.ts
 * But in this case we need it
 */

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, IonicModule, HomeRoutingModule],
})
export class HomeModule {}
