import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  notificationCount: number = 0;
  constructor(public cartService: CartService, private router: Router, public notificationService: NotificationService, private ref: ChangeDetectorRef) { }

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
    this.router.navigate(['/notifications']);
  }


}
