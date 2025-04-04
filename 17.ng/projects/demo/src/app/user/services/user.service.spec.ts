import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { User } from '../../core/types/user';

const urlBase = 'http://localhost:3000';
const urlAPI = '/api/users';
const url = new URL(urlAPI, urlBase);

const mockUser: User = {
  id: '1',
  email: '',
  firstName: 'John',
  lastName: 'Doe',
  password: 'password',
} as User;

// urlBase + '/api/users';

fdescribe('UserService', () => {
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

  it('should getUserById ', () => {
    console.log('TESTING getUserById');
    // Act
    service.getUserById('1').subscribe((data) => {
      // Assert (ASYNC)
      expect(data).toEqual(mockUser);
    });
    // Arrange (ASYNC)
    const testRequest = controller.expectOne(url.toString() + '/1');
    expect(testRequest.request.method).toEqual('GET');
    // Assert
    testRequest.flush({
      results: [mockUser],
      error: '',
    });
  });
});
