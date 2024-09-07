import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaladminPage } from './caladmin.page';

describe('CaladminPage', () => {
  let component: CaladminPage;
  let fixture: ComponentFixture<CaladminPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CaladminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
