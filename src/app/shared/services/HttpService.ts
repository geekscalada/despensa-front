import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, throwError, Observable, timeout, retry } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { ResponseNotReceivedException } from 'src/app/core/exceptions/ResponseNotReceivedException';
import { CustomException } from 'src/app/core/exceptions/CustomException';
import { environment } from 'src/environments/environment';

//TODO: extends overloads of HttpClient library

interface PostJSONRequestOptions {
    headers?: HttpHeaders | { [header: string]: string | string[] };
    context?: HttpContext;
    observe?: 'body';
    params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> };
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
private noResponseMessage = environment.noResponseMessage;
private unknownErrorMessage = environment.unknownErrorMessage;

  constructor(private http: HttpClient) {}

  async post<T> (url: string, body: any, options?: PostJSONRequestOptions  ) : Promise<T> {

    try {
      const response = await lastValueFrom(
        this.http
          .post<T>(url, body, options)
          .pipe(
            timeout(this.serverTimeout),
            retry(this.retryAgain),
            catchError((error: HttpErrorResponse) => {
              if (error.status === 0) {
                throw new ResponseNotReceivedException(
                  error.message,
                  this.noResponseMessage
                );
              }

              const customMessage =
                error.error?.message || this.unknownErrorMessage;

              throw new CustomException(error.message, customMessage);
            })
          )
      );

      return response;
    } catch (error: unknown) {
      throw error;
    }
  

}// end post

}


}