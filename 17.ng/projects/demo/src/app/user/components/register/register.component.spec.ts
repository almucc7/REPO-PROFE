import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { UserService } from '../../services/user.service';
import { of, throwError } from 'rxjs';

const mockUserService: UserService = jasmine.createSpyObj('UserService', {
  register: of({}),
});

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the form', () => {
    const form = fixture.nativeElement.querySelector('form');
    expect(form).toBeTruthy();
    const labels = form.querySelectorAll('label span');
    expect(labels.length).toBe(5);
    expect(labels[0].textContent).toContain('Nombre');
    expect(labels[1].textContent).toContain('Apellido');
    expect(labels[2].textContent).toContain('Email');
    expect(labels[3].textContent).toContain('Avatar');
    expect(labels[4].textContent).toContain('Contraseña');
  });

  it('should be completed by de user and send by register method', () => {
    (mockUserService.register as jasmine.Spy).and.callFake(() => of({}));
    const form = fixture.nativeElement.querySelector('form');
    const nameInput = form.elements.namedItem('firstName') as HTMLInputElement;
    nameInput.value = 'Juan';
    nameInput.dispatchEvent(new Event('input'));
    form.elements.namedItem('lastName').value = 'Pérez';
    form.elements.namedItem('lastName').dispatchEvent(new Event('input'));
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    emailInput.value = 'pepe@sample.com';
    emailInput.dispatchEvent(new Event('input'));
    const passwordInput = form.elements.namedItem(
      'password',
    ) as HTMLInputElement;
    passwordInput.value = '12345678';
    passwordInput.dispatchEvent(new Event('input'));
    const fileInput = form.elements.namedItem('avatar') as HTMLInputElement;
    //const file = new File([''], 'avatar.png', { type: 'image/png' });
    fileInput.files = null;
    //  ?.item(0) = file; //as unknown as FileList;
    fileInput.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.formGroup.valid).toBe(true);
    expect(component.formGroup.get('firstName')?.value).toBe('Juan');
    expect(component.formGroup.get('lastName')?.value).toBe('Pérez');

    const button = form.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    button.click();
    fixture.detectChanges();
    expect(mockUserService.register).toHaveBeenCalled();
  });

  it('should be ...', () => {
    spyOn(console, 'error');
    (mockUserService.register as jasmine.Spy).and.callFake(() => {
      return throwError(() => new Error('Error'));
    });
    component.onSubmit();
    expect(mockUserService.register).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalled();
  });
});
