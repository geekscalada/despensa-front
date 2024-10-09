import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { HomeModule } from '../home/home.module';
import { LibraryComponent } from './library/library.component';

@NgModule({
  declarations: [LibraryComponent],
  imports: [CommonModule, LibraryRoutingModule],
})
export class LibraryModule {}
