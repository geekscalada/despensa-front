import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiAuthService } from './ApiAuthService';
import { ResponseNotReceivedException } from '../exceptions/ResponseNotReceivedException';
import { CustomException } from '../exceptions/CustomException';
import { environment } from '../../../environments/environment';
import { ErrorMessages } from '../../core/exceptions/CustomException';

describe('MyAuthService', () => {
  let service: ApiAuthService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  const noResponseMessage = ErrorMessages.RESPONSE_NOT_RECEIVED;
  const unknownErrorMessage = ErrorMessages.UNKNOWN_ERROR;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiAuthService],
    });
    service = TestBed.inject(ApiAuthService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  //TODO: use motherObjects

  afterEach(() => {
    httpMock.verify();
  });

  it('should log in successfully', async () => {
    const mockResponse = { token: 'fake-token' }; // Ajusta según el tipo de respuesta
    jest.spyOn(httpClient, 'post').mockReturnValue(of(mockResponse));

    const result = await service.login('test@example.com', 'password');

    expect(result).toEqual(mockResponse);
  });

  it('should throw ResponseNotReceivedException on timeout', async () => {
    jest
      .spyOn(httpClient, 'post')
      .mockReturnValue(throwError({ status: 0, message: 'Timeout error' }));

    try {
      await service.login('test@example.com', 'password');
      fail('Expected ResponseNotReceivedException to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(ResponseNotReceivedException);
      if (error instanceof ResponseNotReceivedException) {
        expect(error.customMessage).toEqual(noResponseMessage);
      }
    }
  });

  it('should throw CustomException on server error', async () => {
    const errorResponse = {
      status: 400,
      error: { message: 'Invalid credentials' },
    };
    jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));

    try {
      await service.login('test@example.com', 'password');
      // Si no lanza excepción, fallamos el test
      fail('Expected CustomException to be thrown');
    } catch (error) {
      if (error instanceof CustomException) {
        expect(error.customMessage).toEqual(errorResponse.error.message);
      } else {
        fail('Expected CustomException to be thrown');
      }
    }
  });

  it('should throw default error on unknown error', async () => {
    const unknownError = { status: 500, message: 'Server error' };
    jest.spyOn(httpClient, 'post').mockReturnValue(throwError(unknownError));

    try {
      await service.login('test@example.com', 'password');
      // Si no lanza excepción, fallamos el test
      throw new Error('Expected HttpErrorResponse to be thrown');
    } catch (error: any) {
      expect(error.message).toEqual(unknownError.message);
      expect(error.customMessage).toEqual(unknownErrorMessage);
    }
  });

  it('shold thrown default error on status 500 error', async () => {
    const unknownError = { status: 500 };
    jest.spyOn(httpClient, 'post').mockReturnValue(throwError(unknownError));

    try {
      await service.login('test@example.com', 'password');
      // Si no lanza excepción, fallamos el test
      throw new Error('Expected HttpErrorResponse to be thrown');
    } catch (error: any) {
      expect(error.customMessage).toEqual(unknownErrorMessage);
    }
  });
});
