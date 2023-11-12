import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.page.html',
  styleUrls: ['./course-details.page.scss'],
})
export class CourseDetailsPage implements OnInit {

  courseDetails = "\
  حالات ال ledge والفايلات المكسورة وال curved canals اصبح من اساسيات علاج الجذور مش مختصر عالمتخصصين فقط من خلال الكورس هتقدر تتعامل مع اغلب الحالات المتقدمة بدون التحويل لدكتور متخصص هتتعلم:\
  <ul dir=\"ltr\"\ class=\"ion-no-margin\">\
    <li>Broken file by pass</li\>\
    <li>Broken file removal</li\>\
    <li>Ledge by pass</li\>\
  </ul\>\
  الشغل هيتضمن ال magnification واستخدام تقنيات جديدة \"BFR\"\
  <p dir=\"ltr\" class=\"ion-no-margin\">Egyptian 🇪🇬 vs Italian 🇮🇹\<br\>\
  Dr. Walid Kurdi Vs Dr. Messina</p>"
  constructor() { }

  ngOnInit() {
  }

}
