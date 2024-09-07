import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevoasuetoPage } from './nuevoasueto.page';

describe('NuevoasuetoPage', () => {
  let component: NuevoasuetoPage;
  let fixture: ComponentFixture<NuevoasuetoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NuevoasuetoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
