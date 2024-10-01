import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestStatusPage } from './request-status.page';

describe('RequestStatusPage', () => {
  let component: RequestStatusPage;
  let fixture: ComponentFixture<RequestStatusPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RequestStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
