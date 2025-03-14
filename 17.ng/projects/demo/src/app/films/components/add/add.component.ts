import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Film } from '../../types/film';

@Component({
  selector: 'cas-add',
  imports: [FormsModule],
  template: `
    <h3>Add film</h3>
    <form (ngSubmit)="sendAddFilm()">
      <label for="title">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        [(ngModel)]="film.title"
        required
      />
      <label for="year">Year</label>
      <input
        type="number"
        id="year"
        name="year"
        [(ngModel)]="film.releaseYear"
        required
      />
      <button type="submit">Add</button>
    </form>
  `,
  styles: ``,
})
export class AddComponent {
  film: Film = {
    id: '',
    title: '',
    releaseYear: 0,
  };
  addEvent = output<Film>();

  sendAddFilm() {
    this.film.id = crypto.randomUUID();
    this.addEvent.emit({ ...this.film });
  }
}
