import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-academy',
  templateUrl: './academy.page.html',
  styleUrls: ['./academy.page.scss'],
})
export class AcademyPage implements OnInit {
  segmentValue = 'current';

  currentCourses = ['Broken file bypass & retrieval.', 'Course 1.', 'Course 2.'
  , 'Course 3.', 'Course 4.'];

  oldCourses = ['old Broken file bypass & retrieval.', 'old Course 1.', 'old Course 2.'
  , 'old Course 3.', 'old Course 4.', 'old Course 5.', 'old Course 6.']
  constructor() { }

  ngOnInit() {
  }

}
