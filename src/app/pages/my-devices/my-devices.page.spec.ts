import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyDevicesPage } from './my-devices.page';

describe('MyDevicesPage', () => {
  let component: MyDevicesPage;
  let fixture: ComponentFixture<MyDevicesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyDevicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
