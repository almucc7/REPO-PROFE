import { Component } from '@angular/core';
import { AddComponent } from '../add/add.component';
import { FilmComponent } from '../film/film.component';
import { Film } from '../../types/film';
import { FILMS } from '../../../../../data/films';

@Component({
  selector: 'cas-list',
  imports: [AddComponent, FilmComponent],
  template: `
    <cas-add (addEvent)="addFilm($event)"></cas-add>
    <h3>Listado de películas</h3>
    <ul>
      @for (film of films; track film.id) {
        <li>
          <cas-film [film]="film" (eventDelete)="deleteFilm($event)"></cas-film>
        </li>
      }
    </ul>
  `,
  styles: `
    :host {
      display: block;
      border: 1px solid #ccc;
      padding: 10px;
      margin-top: 10px;
    }
  `,
})
export class ListComponent {
  films: Film[] = FILMS;

  deleteFilm(id: string) {
    this.films = this.films.filter((film) => film.id !== id);
  }

  addFilm(film: Film) {
    this.films = [...this.films, film];
  }
}
