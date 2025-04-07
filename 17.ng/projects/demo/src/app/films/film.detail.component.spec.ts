import { ComponentFixture, TestBed } from '@angular/core/testing';

import FilmDetailComponent from './film.detail.component';
import { StateService } from './services/state.service';
import { of } from 'rxjs';
import { Film } from '../core/types/film';

const mockFilm: Film = {
  id: '1',
  title: 'Film Title',
  description: 'Film Description',
  releaseYear: 2023,
  duration: 120,
  director: 'Director Name',
  rating: 5,
  poster: 'poster.jpg',
};

const mockStateService: StateService = {
  getFilm: (id: string) =>
    of([
      {
        ...mockFilm,
        id,
      },
    ]),
} as StateService;

describe('FilmDetailComponent', () => {
  let component: FilmDetailComponent;
  let fixture: ComponentFixture<FilmDetailComponent>;
  let service: StateService; // Declare the variable to hold the injected service

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmDetailComponent],
      providers: [{ provide: StateService, useValue: mockStateService }],
    }).compileComponents();

    spyOn(mockStateService, 'getFilm').and.callThrough(); // Spy on the getFilm method
    fixture = TestBed.createComponent(FilmDetailComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(StateService); // Inject the StateService to avoid the error
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(service.getFilm).toHaveBeenCalled();
  });
});
