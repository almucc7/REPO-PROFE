import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { User } from '../../core/types/user';
import { environment } from '../../../environments/environment';

const urlBase = environment.urlServer;
const urlAPI = '/api/users';
const url = new URL(urlAPI, urlBase);

const mockUser: User = {
  id: '1',
  // email: '',
  // firstName: 'John',
  // lastName: 'Doe',
  // password: 'password',
} as User;

/*

Preparación del entorno de pruebas para un servicio que depende de HttpClient.

1. TestBed.configureTestingModule({
  imports: [],
  providers: [provideHttpClient(), provideHttpClientTesting(), UserService],
});

2. controller = TestBed.inject(HttpTestingController);

3.  afterEach(() => {controller.verify();})

*/

describe('UserService', () => {
  let service: UserService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(), provideHttpClientTesting(), UserService],
    });
    service = TestBed.inject(UserService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /* Ejemplo de prueba de un método que depende de HTTPClient.

  1.  Act (ASYNC)
  service.getUsers().subscribe((data) => {})

  2.  Arrange (ASYNC)
  Definimos el caso concreto para el controler

  Registramos la ruta que queremos interceptar
  y la respuesta que queremos devolver.

  const testRequest = controller.expectOne(url);

  3 . Assert (ASYNC)
  Comprobamos que el método HTTP es el correcto.
  expect(testRequest.request.method).toEqual('GET');

  4.  Arrange Final (ASYNC)
  testRequest.flush('Según lo que haga el back realmente')

  5. Assert dentro del subscribe  (SYNC)
  subscribe((data) => {
      // Assert (ASYNC)
      expect(data).toEqual(mockUser);
    });

  */

  it('should getUserById ', () => {
    // Act
    service.getUserById('1').subscribe((data) => {
      // Assert (ASYNC)
      expect(data).toEqual(mockUser);
    });
    // Arrange (ASYNC) & Assert
    const testRequest = controller.expectOne(url.toString() + '/1');
    // Assert
    expect(testRequest.request.method).toEqual('GET');

    // Arrange Final (ASYNC)
    testRequest.flush({
      results: [mockUser],
      error: '',
    });
  });
});
