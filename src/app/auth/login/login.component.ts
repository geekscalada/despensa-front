import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiAuthService } from '../../core/services/ApiAuthService';
import { ResponseNotReceivedException } from '../../core/exceptions/ResponseNotReceivedException';
import { ToastService } from 'src/app/shared/services/ToastService';
import { ToastOptions } from '@ionic/angular';
import { i18nTranslateService } from 'src/app/core/services/i18nTranslateService';
import { CustomException } from 'src/app/core/exceptions/CustomException';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: ApiAuthService,
    private toastService: ToastService,
    private translateService: i18nTranslateService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        const response = await this.authService.login(
          this.loginForm.value.email,
          this.loginForm.value.password
        );

        console.log('Login successful', response);

        // Aquí podrías redirigir al usuario a otra página
      } catch (error) {
        if (error instanceof CustomException) {
          if (error.customMessage) {
            const translatedMessage = this.translateService.translate(
              error.customMessage
            );

            const toastOptions: ToastOptions = {
              message: translatedMessage,
              duration: 2000,
              position: 'bottom',
              translucent: true,
              animated: true,
              color: 'danger',
              swipeGesture: 'vertical',
            };

            this.toastService.presentToast(toastOptions);
          }
        }

        if (error instanceof Error) {
          const toastOptions: ToastOptions = {
            message: error.message,
            duration: 2000,
            position: 'bottom',
            translucent: true,
            animated: true,
            color: 'danger',
            swipeGesture: 'vertical',
          };

          this.toastService.presentToast(toastOptions);
        }
      }
    }
  }
}
