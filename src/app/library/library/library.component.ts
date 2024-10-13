import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomException } from 'src/app/core/exceptions/CustomException';
import { ApiAuthService } from 'src/app/core/services/ApiAuthService';
import { i18nTranslateService } from 'src/app/core/services/i18nTranslateService';
import { HttpService } from 'src/app/shared/services/HttpService';
import { ToastService } from 'src/app/shared/services/ToastService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  private apiUrl = environment.apiUrl;

  constructor(
    private authService: ApiAuthService,
    private route: Router,
    private httpService: HttpService,
    private toastService: ToastService,
    private translateService: i18nTranslateService
  ) {}

  logout(): void {
    this.authService.logout();
    this.route.navigate(['/auth/login']);
  }

  ngOnInit() {}

  // Método actualizado usando Observables
  fakeTestRequest(): void {
    this.httpService
      .post<any>(
        `${this.apiUrl}/fakeProtectedArea`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          withCredentials: true,
        }
      )
      .subscribe({
        next: (response) => {
          this.toastService.simpleToast('Success', 'bottom', 'success');
        },
        error: (error) => {
          if (error instanceof CustomException && error.customMessage) {
            const translatedMessage = this.translateService.translate(
              error.customMessage
            );
            this.toastService.simpleToast(
              translatedMessage,
              'bottom',
              'danger'
            );
          } else {
            this.toastService.simpleToast('Server error', 'bottom', 'danger');
          }
        },
      });
  }
}
