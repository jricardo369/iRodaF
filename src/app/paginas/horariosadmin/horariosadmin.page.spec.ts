import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HorariosadminPage } from './horariosadmin.page';

describe('HorariosadminPage', () => {
  let component: HorariosadminPage;
  let fixture: ComponentFixture<HorariosadminPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HorariosadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
