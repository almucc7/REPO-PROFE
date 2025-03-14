import { Component, input, output } from '@angular/core';
import { Film } from '../../types/film';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'cas-film',
  imports: [AddComponent],
  template: `
    <div>
      <strong>{{ film()?.title }}</strong> ({{ film()?.releaseYear }})
      <button (click)="openEdit()">Editar</button>
      <button (click)="sendDelete()">Eliminar</button>
      @if (isEditing) {
        <cas-add (addEvent)="updateFilm($event)"></cas-add>
      }
    </div>
  `,
  styles: ``,
})
export class FilmComponent {
  film = input<Film>();
  eventDelete = output<string>();
  isEditing = false;

  sendDelete() {
    const film = this.film() as Film;
    this.eventDelete.emit(film.id);
  }
  openEdit() {
    this.isEditing = !this.isEditing;
  }

  updateFilm(film: Film) {
    console.log(film);
  }
}
