import { ResponseLogin } from './AuthTypes';

export interface IAuthService {
  login(email: string, password: string): Promise<ResponseLogin>;
  logout(): Promise<void>;
  isAuthenticated(): boolean;
}
