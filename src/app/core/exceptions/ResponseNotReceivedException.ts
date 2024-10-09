import { CustomException, ErrorMessages } from './CustomException';

export class ResponseNotReceivedException extends CustomException<ErrorMessages> {
  constructor(
    message: string,
    customMessage: ErrorMessages = ErrorMessages.RESPONSE_NOT_RECEIVED
  ) {
    super(message, customMessage);
  }
}
