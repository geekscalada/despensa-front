export class CustomException extends Error {
  public readonly customMessage: string;

  constructor(message: string, customMessage: string) {
    super(message);
    this.name = this.constructor.name;
    this.customMessage = customMessage;
  }
}
