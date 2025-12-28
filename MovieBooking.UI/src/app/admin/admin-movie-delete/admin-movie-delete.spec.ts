import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMovieDelete } from './admin-movie-delete';

describe('AdminMovieDelete', () => {
  let component: AdminMovieDelete;
  let fixture: ComponentFixture<AdminMovieDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMovieDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMovieDelete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
