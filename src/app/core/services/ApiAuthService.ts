import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ResponseLogin } from '../interfaces/auth-tokens.interface'; // Importamos el nuevo tipo
import { Injectable } from '@angular/core';
import { IAuthService } from '../interfaces/IAuthService';
import { ResponseNotReceivedException } from '../exceptions/ResponseNotReceivedException';
import { catchError, lastValueFrom, retry, throwError, timeout } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CustomException } from '../exceptions/CustomException';

//TODO: GENERAL: revisar flujo servicio-componente excepciones, mensajes

//TODO: inyectable in root?
@Injectable({
  providedIn: 'root',
})
export class ApiAuthService implements IAuthService {
  private apiUrl = environment.apiUrl;

  //TODO: .ENV approach
  //TODO: REMOVE TRY/CATCH WITH HANDLE ERROR
  // TODO: CREATE A SERVICE TO WRAP HTTPCLIENT

  constructor(private http: HttpClient) {}

  async login(email: string, password: string): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.http
          .post<ResponseLogin>(`${this.apiUrl}/login`, { email, password })
          .pipe(
            timeout(7000),
            retry(1),
            catchError((error: HttpErrorResponse) => {
              if (error.status === 0) {
                throw new ResponseNotReceivedException(
                  error.message,
                  'NO_RESPONSE'
                );
              }

              const customMessage =
                error.error?.message || 'Unknown error occurred';

              throw new CustomException(error.message, customMessage);
            })
          )
      );

      return response;
    } catch (error: unknown) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    // TODO: Implementar logout
  }

  isAuthenticated(): boolean {
    //todo : probably take it from local storage
    return false;
  }
}
