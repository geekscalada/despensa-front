import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageKeys, ResponseLogin } from '../interfaces/AuthTypes'; // Importamos el nuevo tipo
import { Injectable } from '@angular/core';
import { IAuthService } from '../interfaces/IAuthService';
import { ResponseNotReceivedException } from '../exceptions/ResponseNotReceivedException';
import { catchError, lastValueFrom, retry, throwError, timeout } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CustomException } from '../exceptions/CustomException';
import { HttpService } from '../../shared/services/HttpService';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiAuthService implements IAuthService {
  private apiUrl = environment.apiUrl;

  constructor(private httpService: HttpService, private router: Router) {}

  async login(email: string, password: string): Promise<ResponseLogin> {
    try {
      const response = await this.httpService.post<ResponseLogin>(
        `${this.apiUrl}/login`,
        { email, password }
      );

      localStorage.setItem(LocalStorageKeys.accessToken, response.accessToken);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem(LocalStorageKeys.accessToken);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(LocalStorageKeys.accessToken);
  }
}
