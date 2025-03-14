import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'cas-header',
  imports: [LogoComponent],
  template: `
    <header>
      <!-- <img src="/logo.svg" alt="logo" /> -->
      <cas-logo></cas-logo>
      <h1>Welcome {{ title }}!</h1>
      <ng-content></ng-content>
    </header>
  `,
  styles: `
    :host {
      display: block;
      text-align: center;
    }
  `,
})
export class HeaderComponent {
  title = 'demo';
  constructor() {
    console.log('Constructor HeaderComponent');
    console.log(this.title);
  }

  ngOnInit() {
    console.log('On Init HeaderComponent');
  }

  ngOnDestroy() {
    console.log('On Destroy HeaderComponent');
  }
}
