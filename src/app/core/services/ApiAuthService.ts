import { LocalStorageKeys, ResponseLogin } from '../interfaces/AuthTypes'; // Importamos el nuevo tipo
import { Injectable } from '@angular/core';
import { IAuthService } from '../interfaces/IAuthService';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../shared/services/HttpService';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
}) //TODO: implements IAuthService
export class ApiAuthService {
  private apiUrl = environment.apiUrl;

  constructor(private httpService: HttpService) {}

  // Actualizamos para usar Observables en lugar de Promises
  login(email: string, password: string): Observable<ResponseLogin> {
    return this.httpService
      .post<ResponseLogin>(
        `${this.apiUrl}/login`,
        { email, password },
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap((response) => {
          // Guardamos el access token en localStorage
          localStorage.setItem(
            LocalStorageKeys.accessToken,
            response.accessToken
          );
        })
      );
  }

  // Actualizamos el refreshToken para usar Observables
  refreshToken(): Observable<{ accessToken: string }> {
    return this.httpService
      .post<{ accessToken: string }>(
        `${this.apiUrl}/refresh-token`,
        {},
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap((response) => {
          // Guardamos el nuevo access token en localStorage
          localStorage.setItem(
            LocalStorageKeys.accessToken,
            response.accessToken
          );
        })
      );
  }

  // Método logout se mantiene igual
  logout(): void {
    localStorage.removeItem(LocalStorageKeys.accessToken);
  }

  // Método isAuthenticated se mantiene igual
  isAuthenticated(): boolean {
    return !!localStorage.getItem(LocalStorageKeys.accessToken);
  }
}
