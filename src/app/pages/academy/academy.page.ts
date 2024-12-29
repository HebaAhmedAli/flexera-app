import { Component, OnInit } from '@angular/core';
import { CourseBooking } from 'src/app/models/course-booking.model';
import { Course } from 'src/app/models/course.model';
import { AcademyService } from 'src/app/services/academy.service';

@Component({
  selector: 'app-academy',
  templateUrl: './academy.page.html',
  styleUrls: ['./academy.page.scss'],
})
export class AcademyPage implements OnInit {

  segmentValue = 'current';

  currentCourses: Course[] = [];
  oldCourses: Course[] = [];
  loading = true;

  myCourses:  CourseBooking[] = [];

  constructor(private academyService: AcademyService) { }

  ngOnInit() {
    this.getCourses();
  }

  ionViewWillEnter() {
    console.log('inside will enter')
    this.getCourses();
  }

  getCourses() {
    this.academyService.getCourses().subscribe(courses => {
      this.currentCourses = courses.filter(course => course.upcoming);
      this.oldCourses = courses.filter(course => !course.upcoming);
      this.loading = false;
    }), () => {
      this.loading = false;
    }

    this.academyService.getMyCourses().subscribe(courseBookings => {
      this.myCourses = courseBookings;
    })
  }

  navigateToCourseDetails() {

  }

  checkBooked(course: Course): boolean {
    return this.myCourses.findIndex(myCourse => myCourse.course.id === course.id) !== -1
  }
}
