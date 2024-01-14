import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  notificationCount: number = 0;
  constructor(public cartService: CartService, private router: Router, public notificationService: NotificationService, private ref: ChangeDetectorRef, private navCtrl: NavController) { }

  ngOnInit() {
    this.notificationCount = this.notificationService.getUnreadNotificationsCount();
    this.notificationService.unreadNotificationsCountSubject.subscribe(count => {
      this.notificationCount = count;
      this.ref.detectChanges();
    })
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  navigateToNotifications() {
    console.log('navigateToNotifications')
    //this.router.navigate(['/tabs/home'], { replaceUrl: true });
    this.router.navigate(['/notifications']);
  }

  navigateToHome() {
    this.router.navigate(['/tabs/home']);

  }


}
