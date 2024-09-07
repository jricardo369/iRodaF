import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearpaquetePage } from './crearpaquete.page';

describe('CrearpaquetePage', () => {
  let component: CrearpaquetePage;
  let fixture: ComponentFixture<CrearpaquetePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrearpaquetePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
