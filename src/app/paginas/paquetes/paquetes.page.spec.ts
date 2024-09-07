import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaquetesPage } from './paquetes.page';

describe('PaquetesPage', () => {
  let component: PaquetesPage;
  let fixture: ComponentFixture<PaquetesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaquetesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
