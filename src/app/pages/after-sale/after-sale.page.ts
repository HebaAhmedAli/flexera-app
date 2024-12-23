import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecureStorage } from 'src/app/services/secure-storage.service';

@Component({
  selector: 'app-after-sale',
  templateUrl: './after-sale.page.html',
  styleUrls: ['./after-sale.page.scss'],
})
export class AfterSalePage implements OnInit {

  isAlertOpen = false;
  constructor(private storage: SecureStorage, private router: Router) { }

  ngOnInit() {
  }

  async navigateToMaintainenceRequest() {
    const mode = await this.storage.get('mode');
   if(mode == 'guest') {
      this.isAlertOpen = true;
    } else {
      this.router.navigate(['/maintenence-request']);
    }

  }
}
