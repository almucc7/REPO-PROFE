import { Component } from '@angular/core';

@Component({
  selector: 'cas-footer',
  imports: [],
  template: `
    <p>{{ today.toLocaleDateString() }} - {{ today.toLocaleTimeString() }}</p>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class FooterComponent {
  today = new Date();
}
