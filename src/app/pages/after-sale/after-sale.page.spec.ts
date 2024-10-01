import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AfterSalePage } from './after-sale.page';

describe('AfterSalePage', () => {
  let component: AfterSalePage;
  let fixture: ComponentFixture<AfterSalePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AfterSalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
