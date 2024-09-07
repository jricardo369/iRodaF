import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarpassPage } from './cambiarpass.page';

describe('CambiarpassPage', () => {
  let component: CambiarpassPage;
  let fixture: ComponentFixture<CambiarpassPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CambiarpassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
