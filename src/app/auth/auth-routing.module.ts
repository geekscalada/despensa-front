import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Asegúrate de importar el componente

// TODO: Add AuthGuard?
// Ruta /auth/login
const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Ruta para el formulario de login
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
