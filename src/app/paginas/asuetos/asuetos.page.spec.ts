import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsuetosPage } from './asuetos.page';

describe('AsuetosPage', () => {
  let component: AsuetosPage;
  let fixture: ComponentFixture<AsuetosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AsuetosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
