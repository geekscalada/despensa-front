import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ITranslateService } from '../interfaces/ITranslateService';
import { environment } from '../../../environments/environment';

// Generate Interface for the service

@Injectable({
  providedIn: 'root',
})
export class i18nTranslateService implements ITranslateService {
  private defaultLanguage = environment.defaultLanguage;
  private supportedLanguages = environment.supportedLanguages;

  constructor(private translateService: TranslateService) {
    this.setDefaultLanguage();
  }

  setDefaultLanguage() {
    const browserLang = this.translateService.getBrowserLang();
    if (!browserLang) {
      this.translateService.setDefaultLang(this.defaultLanguage);
    } else {
      this.translateService.setDefaultLang(
        this.supportedLanguages.includes(browserLang)
          ? browserLang
          : this.defaultLanguage
      );
    }
  }

  translate(key: string, params?: any): string {
    const translation = this.translateService.instant(key, params);
    if (translation === key) {
      // TODO: implement loggers
      console.log(`Translation not found for key: ${key}`);
    }

    return translation;
  }

  get currentLang() {
    return this.translateService.currentLang;
  }
}
