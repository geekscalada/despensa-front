import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiAuthService } from '../../core/services/ApiAuthService';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: ApiAuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
