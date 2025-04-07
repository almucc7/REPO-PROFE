import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { UserService } from '../../../user/services/user.service';
import { ComponentRef, computed } from '@angular/core';
import { MenuItem } from '../../../app.component';
import { provideRouter } from '@angular/router';

const mockMenuItems: MenuItem[] = [
  {
    label: 'Home',
    path: '/home',
  },
];

const mockUserService = {
  logout: jasmine.createSpy('logout'), // Simulando el método logout
  //jasmine.createSpy('logout'),
  token: computed(() => null), // Simulando un token no nulo
};

describe('MenuComponent', () => {
  let component: MenuComponent;
  let componentRef: ComponentRef<MenuComponent>;
  let fixture: ComponentFixture<MenuComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },

        provideRouter([]), // Mock router provider
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('items', mockMenuItems);
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display menu items', () => {
    const compiled = fixture.nativeElement;
    const menuItems = compiled.querySelectorAll('a');
    expect(menuItems.length).toBe(mockMenuItems.length);
    expect(menuItems[0].textContent).toContain(mockMenuItems[0].label);
  });

  it('should call logout on UserService when logout is clicked', () => {
    // Simular el login como si token no fuera nulo
    // Lanzar luego la detección de cambios
    component.isLogin = computed(() => true);
    fixture.detectChanges();

    // Ejecutar el método logout directamente
    // No es la forma mas correcta de simular el evento de clic
    //component.logout(new Event('click'));

    //Simular el click en el enlace de logout
    const compiled = fixture.nativeElement;
    const logoutLink = compiled.querySelector('a[href="/"]');
    expect(logoutLink).toBeTruthy();
    logoutLink.click();

    // Comprobar que el método logout fue llamad
    expect(userService.logout).toHaveBeenCalled();
  });
});
