import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalalumnoPage } from './calalumno.page';

describe('CalalumnoPage', () => {
  let component: CalalumnoPage;
  let fixture: ComponentFixture<CalalumnoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CalalumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
