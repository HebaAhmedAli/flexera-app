import { Component, OnInit } from '@angular/core';
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

  constructor(private academyService: AcademyService) { }

  ngOnInit() {
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
  }

  navigateToCourseDetails() {

  }

}
