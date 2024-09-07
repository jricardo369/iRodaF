import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalInfEaPage } from './modal-inf-ea.page';

describe('ModalInfEaPage', () => {
  let component: ModalInfEaPage;
  let fixture: ComponentFixture<ModalInfEaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalInfEaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
