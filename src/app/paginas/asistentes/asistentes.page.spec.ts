import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsistentesPage } from './asistentes.page';

describe('AsistentesPage', () => {
  let component: AsistentesPage;
  let fixture: ComponentFixture<AsistentesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AsistentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
