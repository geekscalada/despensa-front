import { MESSAGES } from '../../../assets/i18n/messages';

//TODO: GET PRIVATE
export class ResponseNotReceivedException extends Error {
  public customMessage: string;

  constructor(private key: string) {
    super(); // Llama al constructor de la clase Error
    this.name = 'ResponseNotReceivedException';
    this.customMessage = this.getCustomMessage(key);
  }

  private getCustomMessage(key: string): string {
    return MESSAGES[key] || 'Error desconocido';
  }
}
