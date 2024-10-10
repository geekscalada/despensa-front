import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiAuthService } from '../../core/services/ApiAuthService';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: ApiAuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/library']); // Usuario autenticado, redirigir a otra página
      return false;
    } else {
      return true; // No autenticado, permitir acceso a la página de login
    }
  }
}
