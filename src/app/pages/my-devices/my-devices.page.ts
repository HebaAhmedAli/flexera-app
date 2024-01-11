import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DeviceModel } from 'src/app/models/device.model';
import * as moment from 'moment';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-my-devices',
  templateUrl: './my-devices.page.html',
  styleUrls: ['./my-devices.page.scss'],
})
export class MyDevicesPage implements OnInit {

  myDevices: DeviceModel[] = [] ;

  constructor(private deviceService: DeviceService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {

      this.deviceService.getDevices().subscribe(data => {
        this.myDevices = data.filter(device =>  device.warrantyStartDate &&  device.warrantyStartDate !== '');
        this.ref.detectChanges();
      },
      err => {
        console.log(err);
      })
    }

    dateDiffFromNow(endingDate: string): string {
      let startDate = new Date(new Date().toISOString().substr(0, 10));
      let endDate = new Date(new Date(endingDate).toISOString().substr(0, 10)); // need date in YYYY-MM-DD format
      console.log(startDate, endDate)
      if (startDate > endDate) {
        const swap = startDate;
        startDate = endDate;
        endDate = swap;
      }
      const startYear = startDate.getFullYear();
      const february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
      const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      let yearDiff = endDate.getFullYear() - startYear;
      console.log(startYear, endDate.getFullYear(), yearDiff);

      let monthDiff = endDate.getMonth() - startDate.getMonth();
      if (monthDiff < 0) {
        yearDiff--;
        monthDiff += 12;
      }
      let dayDiff = endDate.getDate() - startDate.getDate();
      if (dayDiff < 0) {
        if (monthDiff > 0) {
          monthDiff--;
        } else {
          yearDiff--;
          monthDiff = 11;
        }
        dayDiff += daysInMonth[startDate.getMonth()];
      }

      return yearDiff + 'Y ' + monthDiff + 'M ' + dayDiff + 'D';
    }

    getWarrantyCountDown(device : DeviceModel): string {
      if(!device) return '';
      var splittedDate = (device.warrantyStartDate as string).split('/');
      if(!splittedDate || splittedDate.length < 3) return '';
      return  this.dateDiffFromNow(String(Number(splittedDate[2]) + device.warrantyPeriod) + '-' + splittedDate[1] + '-' + splittedDate[0]);

    }
}


