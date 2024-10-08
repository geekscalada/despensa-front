import { CustomException } from './CustomException';

export class ResponseNotReceivedException extends CustomException {
  constructor(
    message: string,
    customMessage: string = 'Response not received'
  ) {
    super(message, customMessage);
  }
}
