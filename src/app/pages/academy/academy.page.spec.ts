import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcademyPage } from './academy.page';

describe('AcademyPage', () => {
  let component: AcademyPage;
  let fixture: ComponentFixture<AcademyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AcademyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
