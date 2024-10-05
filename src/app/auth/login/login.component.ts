import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiAuthService } from '../../core/services/ApiAuthService';
import { ResponseNotReceivedException } from '../../core/exceptions/ResponseNotReceivedException';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private authService: ApiAuthService) {
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
        this.loginError = null;
        // Aquí podrías redirigir al usuario a otra página
      } catch (error) {
        if (error instanceof ResponseNotReceivedException) {
          this.loginError = error.customMessage; // Mostrar mensaje traducido en el componente
        } else {
          this.loginError =
            'Error durante el login, por favor intente de nuevo.';
        }
      }
    } else {
      console.log('Invalid Form');
      this.loginError = 'Por favor complete todos los campos correctamente.';
    }
  }
}
