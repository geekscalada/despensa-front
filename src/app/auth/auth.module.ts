import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { i18nTranslateService } from '../core/services/i18nTranslateService';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AuthRoutingModule, IonicModule, ReactiveFormsModule],
  providers: [i18nTranslateService],
})
export class AuthModule {}
