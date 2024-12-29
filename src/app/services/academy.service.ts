import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CourseBookingRq } from '../models/course-booking-rq.model';
import { CourseBooking } from '../models/course-booking.model';

@Injectable({
  providedIn: 'root'
})
export class AcademyService {

  constructor(private httpClient: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(`${environment.baseUrl}/api/v1/courses`);
  }

  getCourseById(id: number): Observable<Course> {
    return this.httpClient.get<Course>(`${environment.baseUrl}/api/v1/courses/${id}`);
  }

  public bookCourse(courseBookingRq: CourseBookingRq): Observable<HttpResponse<Object>> {

      return this.httpClient.post(`${environment.baseUrl}/api/v1/book-course`, courseBookingRq, { observe: 'response' });
    }

   public getMyCourses(): Observable<Array<CourseBooking>> {
      return this.httpClient.get<Array<CourseBooking>>(
        `${environment.baseUrl}/api/v1/my-courses`
      );
    }
}
