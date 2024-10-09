import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ResponseLogin } from '../interfaces/auth-tokens.interface'; // Importamos el nuevo tipo
import { Injectable } from '@angular/core';
import { IAuthService } from '../interfaces/IAuthService';
import { ResponseNotReceivedException } from '../exceptions/ResponseNotReceivedException';
import { catchError, lastValueFrom, retry, throwError, timeout } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CustomException } from '../exceptions/CustomException';
import { HttpService } from '../../shared/services/HttpService';

//TODO: GENERAL: revisar flujo servicio-componente excepciones, mensajes

//TODO: inyectable in root?
@Injectable({
  providedIn: 'root',
})
export class ApiAuthService implements IAuthService {
  private apiUrl = environment.apiUrl;

  constructor(private httpService: HttpService) {}

  async login(email: string, password: string): Promise<any> {
    try {
      const response = await this.httpService.post<ResponseLogin>(
        `${this.apiUrl}/login`,
        { email, password }
      );

      return response;
    } catch (error) {
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
