import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarclasePage } from './editarclase.page';

describe('EditarclasePage', () => {
  let component: EditarclasePage;
  let fixture: ComponentFixture<EditarclasePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditarclasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
