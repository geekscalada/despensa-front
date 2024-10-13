import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { catchError, switchMap, throwError, Observable, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Solicitud interceptada:', request);

    return next.handle(request).pipe(
      tap({
        next: (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log('Respuesta exitosa interceptada:', event);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log('Error interceptado:', error);
        },
      })
    );
  }
}
