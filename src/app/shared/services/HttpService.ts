import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpContext,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { catchError, Observable, timeout, retry, throwError } from 'rxjs';
import { ResponseNotReceivedException } from '../../core/exceptions/ResponseNotReceivedException';
import {
  CustomException,
  ErrorMessages,
} from '../../core/exceptions/CustomException';
import { environment } from '../../../environments/environment';

interface PostJSONRequestOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  context?: HttpContext;
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?: { includeHeaders?: string[] } | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private serverTimeout = environment.serverTimeout;
  private retryAgain = environment.retryAgain;

  constructor(private http: HttpClient) {}

  // Método POST usando observables
  post<T>(
    url: string,
    body: any,
    options?: PostJSONRequestOptions
  ): Observable<T> {
    return this.http.post<T>(url, body, options).pipe(
      timeout(this.serverTimeout),
      retry(this.retryAgain),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  // Manejo de errores para reutilizar en otras solicitudes
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      /**
       * Se utiliza este patrón factory para crear una nueva instancia de la excepción
       de esta manera la excepción solo se crea cuando alguien se subscribe al observable
       que devuelve el throwError, es decir que devuelve el handleError
       por lo tanto el que se subscribe es el que está consumiendo el servicio
       */
      return throwError(
        () =>
          new ResponseNotReceivedException(
            error.message,
            ErrorMessages.RESPONSE_NOT_RECEIVED
          )
      );
    }

    // Otro tipo de error HTTP
    const customMessage = error.error?.message || ErrorMessages.UNKNOWN_ERROR;

    return throwError(() => new CustomException(error.message, customMessage));
  }
}
