import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearclasePage } from './crearclase.page';

describe('CrearclasePage', () => {
  let component: CrearclasePage;
  let fixture: ComponentFixture<CrearclasePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrearclasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
