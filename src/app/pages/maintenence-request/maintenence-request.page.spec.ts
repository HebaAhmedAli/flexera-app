import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaintenenceRequestPage } from './maintenence-request.page';

describe('MaintenenceRequestPage', () => {
  let component: MaintenenceRequestPage;
  let fixture: ComponentFixture<MaintenenceRequestPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MaintenenceRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
