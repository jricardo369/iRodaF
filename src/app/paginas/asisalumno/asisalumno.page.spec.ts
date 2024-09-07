import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsisalumnoPage } from './asisalumno.page';

describe('AsisalumnoPage', () => {
  let component: AsisalumnoPage;
  let fixture: ComponentFixture<AsisalumnoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AsisalumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
