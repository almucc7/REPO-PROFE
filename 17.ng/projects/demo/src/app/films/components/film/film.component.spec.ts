import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmComponent } from './film.component';
import { StateService } from '../../services/state.service';
import { provideRouter, RouterModule } from '@angular/router';
import { UserLogged, UserService } from '../../../user/services/user.service';
import { ComponentRef, computed } from '@angular/core';

const mockCurrentUser: UserLogged = {
  role: 'ADMIN',
} as UserLogged;

describe('FilmComponent', () => {
  let component: FilmComponent;
  let componentRef: ComponentRef<FilmComponent>;
  let fixture: ComponentFixture<FilmComponent>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let filmService: StateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmComponent, RouterModule],
      providers: [
        provideRouter([]),
        {
          provide: StateService,
          useValue: {
            deleteFilm: jasmine.createSpy('deleteFilm'),
          },
        },
        {
          provide: UserService,
          useValue: {
            currentUser: computed(() => mockCurrentUser),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FilmComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('film', {
      title: 'Test Film',
    });
    filmService = TestBed.inject(StateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
