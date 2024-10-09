import { ResponseLogin } from './auth-tokens.interface';

export interface IAuthService {
  login(email: string, password: string): Promise<ResponseLogin>;
  logout(): Promise<void>;
  isAuthenticated(): boolean;
}
