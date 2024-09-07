import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsistenciasusuarioPage } from './asistenciasusuario.page';

describe('AsistenciasusuarioPage', () => {
  let component: AsistenciasusuarioPage;
  let fixture: ComponentFixture<AsistenciasusuarioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AsistenciasusuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
