import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiAuthService } from '../../core/services/ApiAuthService';
import { ResponseNotReceivedException } from '../../core/exceptions/ResponseNotReceivedException';
import { ToastService } from 'src/app/shared/services/ToastService';
import { i18nTranslateService } from 'src/app/core/services/i18nTranslateService';
import { CustomException } from 'src/app/core/exceptions/CustomException';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/shared/services/HttpService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  validationMessages: { [key: string]: string } = {};

  private apiUrl = environment.apiUrl;

  constructor(
    private fb: FormBuilder,
    private authService: ApiAuthService,
    private toastService: ToastService,
    private translateService: i18nTranslateService,
    private route: Router,
    private httpService: HttpService
  ) {}

  public setValidationMessages() {
    console.log('Setting validation messages');
    const controls = this.loginForm.controls;

    // Mensajes para el campo de email
    if (controls['email'].touched && controls['email'].hasError('required')) {
      this.validationMessages['email'] = 'Email is required';
    } else if (
      controls['email'].touched &&
      controls['email'].hasError('email')
    ) {
      this.validationMessages['email'] = 'Invalid email format';
    } else {
      this.validationMessages['email'] = '';
    }

    // Mensajes para el campo de password
    if (
      controls['password'].touched &&
      controls['password'].hasError('required')
    ) {
      this.validationMessages['password'] = 'Password is required';
    } else if (
      controls['password'].touched &&
      controls['password'].hasError('minlength')
    ) {
      const requiredLength =
        controls['password'].getError('minlength').requiredLength;
      this.validationMessages[
        'password'
      ] = `Password must be at least ${requiredLength} characters long.`;
    } else {
      this.validationMessages['password'] = '';
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      // Lógica de envío de formulario
      this.authService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: (response) => {
            this.route.navigate(['/library']);
            this.toastService.simpleToast(
              'Login successful',
              'bottom',
              'success'
            );
          },
          error: () => {
            this.toastService.simpleToast('Server error', 'bottom', 'danger');
          },
        });
    } else {
      this.setValidationMessages(); // Actualizamos los mensajes si el formulario es inválido
      this.toastService.simpleToast('Invalid form', 'bottom', 'danger');
    }
  }

  goProtectedRoute(): void {
    console.log('Go to protected route');
    this.route.navigate(['/library']);
  }

  logout(): void {
    this.authService.logout();
    this.route.navigate(['/auth/login']);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.setValidationMessages();
    });
  }
}
