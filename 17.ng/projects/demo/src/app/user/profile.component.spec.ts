import { ComponentFixture, TestBed } from '@angular/core/testing';

import ProfileComponent from './profile.component';
import { UserLogged, UserService } from './services/user.service';
import { computed } from '@angular/core';
import { of } from 'rxjs';

const mockUser: UserLogged = {} as UserLogged;

const mockUserService = {
  currentUser: computed(() => mockUser),
  getUserById: (id: string) =>
    of({
      ...mockUser,
      id,
    }),
};

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
