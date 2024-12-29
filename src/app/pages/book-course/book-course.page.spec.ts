import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookCoursePage } from './book-course.page';

describe('BookCoursePage', () => {
  let component: BookCoursePage;
  let fixture: ComponentFixture<BookCoursePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BookCoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
