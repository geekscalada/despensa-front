export interface ITranslateService {
  translate(key: string, params?: any): string;
  currentLang: string;
}
