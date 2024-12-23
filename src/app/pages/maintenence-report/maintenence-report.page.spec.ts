import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaintenenceReportPage } from './maintenence-report.page';

describe('MaintenenceReportPage', () => {
  let component: MaintenenceReportPage;
  let fixture: ComponentFixture<MaintenenceReportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MaintenenceReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
