import { ComponentFixture, TestBed } from '@angular/core/testing';

import FilmDetailComponent from './film.detail.component';
import { StateService } from './services/state.service';
import { RepoService } from './services/repo.service';
import { HttpClientModule } from '@angular/common/http';

xdescribe('FilmDetailComponent', () => {
  let component: FilmDetailComponent;
  let fixture: ComponentFixture<FilmDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmDetailComponent, HttpClientModule],
      providers: [StateService, RepoService],
    }).compileComponents();

    fixture = TestBed.createComponent(FilmDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
