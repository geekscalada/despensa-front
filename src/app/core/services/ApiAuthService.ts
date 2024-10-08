import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ResponseLogin } from '../interfaces/auth-tokens.interface'; // Importamos el nuevo tipo
import { Injectable } from '@angular/core';
import { IAuthService } from '../interfaces/IAuthService';
import { ResponseNotReceivedException } from '../exceptions/ResponseNotReceivedException';
import { catchError, lastValueFrom, retry, throwError, timeout } from 'rxjs';
import { i18nTranslateService } from './i18nTranslateService';
import { environment } from '../../../environments/environment';

//TODO: GENERAL: revisar flujo servicio-componente excepciones, mensajes

//TODO: inyectable in root?
@Injectable({
  providedIn: 'root',
})
export class ApiAuthService implements IAuthService {
  private apiUrl = environment.apiUrl;
  private authenticated = false;

  constructor(
    private http: HttpClient,
    private translateService: i18nTranslateService
  ) {}

  async login(email: string, password: string): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.http
          .post<ResponseLogin>(`${this.apiUrl}/login`, { email, password })
          .pipe(
            timeout(7000),
            retry(1),
            catchError((error) => {
              console.log(error.error.message);

              if (error.status === 0) {
                throw new ResponseNotReceivedException(
                  error.message,
                  'NO_RESPONSE'
                );
              }

              throw new Error(error.error.message);
            })
          )
      );

      this.authenticated = true;

      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }

      throw new Error('Unknown error');
    }
  }

  async logout(): Promise<void> {
    // TODO: Implementar logout
    this.authenticated = false;
  }

  isAuthenticated(): boolean {
    //todo : probably take it from local storage
    return this.authenticated;
  }
}
