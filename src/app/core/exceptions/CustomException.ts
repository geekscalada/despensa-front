export enum ErrorMessages {
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  RESPONSE_NOT_RECEIVED = 'RESPONSE_NOT_RECEIVED',
}

export class CustomException<T extends ErrorMessages> extends Error {
  public readonly customMessage: T;

  constructor(message: string, customMessage: T) {
    super(message);
    this.name = this.constructor.name;
    this.customMessage = customMessage;
  }
}
