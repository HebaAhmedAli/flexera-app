import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { AcademyService } from 'src/app/services/academy.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.page.html',
  styleUrls: ['./course-details.page.scss'],
})
export class CourseDetailsPage implements OnInit, OnDestroy {

  course?: Course;
  subscriptions: Subscription[] = [];
  loading = true;
  image?: string;

  constructor(private academyService: AcademyService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const courseId = Number(this.activatedRoute.snapshot.paramMap.get('course_id') as string);
    if(courseId) {
      this.getCourseDetails(courseId);
    }
  }

  getCourseDetails(courseId: number) {
    this.academyService.getCourseById(courseId)
    .subscribe(course => {
      this.course = course;
       this.loading = false;
       this.image = `${environment.baseUrl}/images/${course.image}`
      }),
    () => {this.loading = false}
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
