export class CustomException extends Error {
  public readonly customMessage: string | null;

  constructor(message: string, customMessage: string) {
    super(message);
    this.name = this.constructor.name;
    this.customMessage = customMessage;
  }
}
