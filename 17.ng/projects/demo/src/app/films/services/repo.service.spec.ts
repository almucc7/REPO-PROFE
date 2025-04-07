import { TestBed } from '@angular/core/testing';

import { RepoService } from './repo.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Film } from '../../core/types/film';

const urlBase = 'http://localhost:3000';
const urlAPI = '/api/films';
const url = urlBase + urlAPI;

describe('RepoService', () => {
  let service: RepoService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [RepoService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(RepoService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load films', () => {
    service.loadFilms().subscribe((films) => {
      expect(films.length).toEqual(1);
      expect(films).toEqual([{} as Film]);
    });
    const routeTest = controller.expectOne(url);
    expect(routeTest.request.method).toEqual('GET');
    routeTest.flush({
      results: [{}],
      error: '',
    });
  });

  it('should get film by id', () => {
    const id = '1';
    service.getFilmById(id).subscribe((films) => {
      expect(films.length).toEqual(1);
      expect(films).toEqual([{} as Film]);
    });
    const routeTest = controller.expectOne(`${url}/${id}`);
    expect(routeTest.request.method).toEqual('GET');
    routeTest.flush({
      results: [{}],
      error: '',
    });
  });

  it('should create film', () => {
    const mockFilm = {} as Film;
    service.createFilm(mockFilm).subscribe((film) => {
      expect(film).toEqual(mockFilm);
    });
    const routeTest = controller.expectOne(url);
    expect(routeTest.request.method).toEqual('POST');
    routeTest.flush({
      results: [mockFilm],
      error: '',
    });
  });

  it('should update film', () => {
    const mockFilm = {} as Film;
    service.updateFilm(mockFilm).subscribe((film) => {
      expect(film).toEqual(mockFilm);
    });
    const routeTest = controller.expectOne(`${url}/${mockFilm.id}`);
    expect(routeTest.request.method).toEqual('PATCH');
    routeTest.flush({
      results: [mockFilm],
      error: '',
    });
  });

  it('should delete film', () => {
    const mockFilm = { id: '1' } as Film;
    service.deleteFilm('1').subscribe((data) => {
      expect(data).toEqual(undefined);
    });
    const routeTest = controller.expectOne(`${url}/${mockFilm.id}`);
    expect(routeTest.request.method).toEqual('DELETE');
    //routeTest.flush();
  });
});
