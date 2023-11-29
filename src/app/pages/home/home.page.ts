import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  categories: Array<CategoryModel>  = [];

  constructor(private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    },
    err => {
      console.log(err);
    })
  }


}
