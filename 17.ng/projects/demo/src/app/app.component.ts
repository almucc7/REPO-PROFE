import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'cas-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MenuComponent],
  template: `
    <cas-header>
      <cas-menu />
    </cas-header>
    <main>
      <p>1</p>
      <p>2</p>
      <router-outlet />
    </main>
    <cas-footer />
  `,
  styles: [],
})
export class AppComponent {}
