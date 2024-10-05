import { HttpClient } from '@angular/common/http';
import { ResponseLogin } from '../interfaces/auth-tokens.interface'; // Importamos el nuevo tipo
import { Injectable } from '@angular/core';
import { IAuthService } from '../interfaces/IAuthService';
import { ResponseNotReceivedException } from '../exceptions/ResponseNotReceivedException';
import { timeout } from 'rxjs';

//TODO: inyectable in root?
@Injectable({
  providedIn: 'root',
})
export class ApiAuthService implements IAuthService {
  private apiUrl = 'http://192.168.33.22:3000/api';
  private authenticated = false;

  constructor(private http: HttpClient) {}

  async login(email: string, password: string): Promise<ResponseLogin> {
    try {
      const response = await this.http
        .post<ResponseLogin>(`${this.apiUrl}/login`, { email, password })
        .pipe(timeout(5000))
        .toPromise();

      if (!response) {
        //TODO: force to use a key of the messages
        throw new ResponseNotReceivedException('NO_RESPONSE');
      }

      this.authenticated = true;
      console.log('response: ', response);
      return response;
    } catch (error) {
      //TODO: USE MIDDLEWARE OR SIMILAR ?

      if (error instanceof ResponseNotReceivedException) {
        console.error(error.customMessage);
      }
      throw new Error('Login failed, please try again');
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
