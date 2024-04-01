import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FullScreenModalComponent } from 'src/app/components/full-screen-modal/full-screen-modal.component';
import { CategoryModel } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { GlobalService } from 'src/app/services/global.service';
import { SystemParametersService } from 'src/app/services/system-parameters.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  categories: Array<CategoryModel>  = [];

  constructor(private categoryService: CategoryService,
    private globalService: GlobalService,
    private sysParamServ: SystemParametersService,
    private modalController: ModalController
  ) { }

  async ngOnInit() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    },
    err => {
      console.log(err);
    })

    const showEventPopup = this.sysParamServ.getValue('SHOW_EVENT_SPLASH') as string;
      if(showEventPopup === 'Y' && !this.globalService.eventScreenShowed) {
            const modalEl = await this.modalController.create({
              component: FullScreenModalComponent,
              cssClass: 'gallery-full-modal',
              componentProps: {
                url: 'images/event.png',
                type: 'img'
              },
              backdropDismiss: true
            });
            return await modalEl.present();

      }

  }


}
