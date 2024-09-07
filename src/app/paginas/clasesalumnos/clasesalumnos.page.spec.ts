import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClasesalumnosPage } from './clasesalumnos.page';

describe('ClasesalumnosPage', () => {
  let component: ClasesalumnosPage;
  let fixture: ComponentFixture<ClasesalumnosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ClasesalumnosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
