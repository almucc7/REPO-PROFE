import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { UserService } from '../../../user/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { ComponentRef } from '@angular/core';
import { MenuItem } from '../../../app.component';
import { provideRouter } from '@angular/router';

const mockMenuItems: MenuItem[] = [
  {
    label: 'Home',
    path: '/home',
  },
];

fdescribe('MenuComponent', () => {
  let component: MenuComponent;
  let componentRef: ComponentRef<MenuComponent>;
  let fixture: ComponentFixture<MenuComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent, HttpClientModule],
      providers: [
        UserService,
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
    const menuItems = compiled.querySelectorAll('li a');
    expect(menuItems.length).toBe(mockMenuItems.length + 2);
    expect(menuItems[0].textContent).toContain(mockMenuItems[0].label);
  });

  it('should call logout on UserService when logout is clicked', () => {
    spyOn(userService, 'token').and.returnValue('el-token');
    spyOn(userService, 'logout').and.callThrough();
    // fixture.detectChanges();
    //component.logout(new Event('click'));

    const compiled = fixture.nativeElement;
    const logoutLink = compiled.querySelector('a[href="/"]');
    expect(logoutLink).toBeTruthy();
    logoutLink.click();

    expect(userService.logout).toHaveBeenCalled();
  });
});
