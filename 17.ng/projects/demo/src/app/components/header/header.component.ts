import { Component } from '@angular/core';

@Component({
  selector: 'cas-header',
  imports: [],
  template: `
    <header>
      <h1>Welcome {{ title }}!</h1>
      <ng-content></ng-content>
    </header>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class HeaderComponent {
  title = 'demo';
  constructor() {
    console.log(this.title);
  }
}
