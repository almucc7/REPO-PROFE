import { Component } from '@angular/core';
import { RegisterComponent } from '../user/register/register.component';
import { LoginComponent } from '../user/login/login.component';

@Component({
  selector: 'cas-home',
  imports: [RegisterComponent, LoginComponent],
  template: `
    <h1>Home</h1>
    <p>Esta es la página de inicio</p>
    <cas-register></cas-register>
    <cas-login></cas-login>
  `,
  styles: ``,
})
export default class HomeComponent {}
