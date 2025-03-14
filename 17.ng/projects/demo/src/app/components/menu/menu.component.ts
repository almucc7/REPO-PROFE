import { Component } from '@angular/core';

type MenuItem = {
  path: string;
  label: string;
};

@Component({
  selector: 'cas-menu',
  imports: [],
  template: `
    <nav>
      <ul>
        @for (item of items; track item.path) {
        <li>
          <a [href]="item.path">{{ item.label }}</a>
        </li>
        } @if (isLogin) {
        <li>
          <a [href]="'/profile'">Profile</a>
        </li>
        <li>
          <a [href]="'/logout'">Logout</a>
        </li>
        } @else {
        <li>
          <a [href]="'/login'">Login</a>
        </li>
        <li>
          <a [href]="'/register'">Register</a>
        </li>
        }
      </ul>
    </nav>
  `,
  styles: `
    :host {
      display: block;
    }
    nav {
      background-color: #333;
      color: white;
    }
    ul {
      display: flex;
      justify-content: space-around;
      list-style: none;
      padding: 0;
    }
    li {
      padding: 1rem;
    }
    a {
      color: white;
      text-decoration: none;
    }
  `,
})
export class MenuComponent {
  items: MenuItem[];
  isLogin: boolean = false;
  constructor() {
    this.items = [
      {
        path: '/',
        label: 'Home',
      },
      {
        path: '/about',
        label: 'About',
      },
      {
        path: '/contact',
        label: 'Contact',
      },
    ];
  }
}
