import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  constructor(public cartService: CartService, private router: Router) { }

  ngOnInit() {}

  navigateToCart() {
    this.router.navigate(['/cart']);
  }


}
