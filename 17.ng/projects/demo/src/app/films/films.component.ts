import { Component } from '@angular/core';
import { ListComponent } from './components/list/list.component';

@Component({
  selector: 'cas-films',
  imports: [ListComponent],
  template: `
    <h2>Films</h2>
    <cas-list></cas-list>
  `,
  styles: ``,
})
export default class FilmsComponent {}
