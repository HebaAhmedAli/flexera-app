import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KeyValue } from '@angular/common';
import { CategoryModel } from '../models/category.model';
import { SystemParameter } from '../models/system-parameter.model';

@Injectable({
  providedIn: 'root'
})
export class SystemParametersService {

  sysFectched = new Subject();

  systemParameters: SystemParameter[] = [];

  constructor(private httpClient: HttpClient) { }


  public getSystemParameters(): void {
   this.httpClient.get<Array<SystemParameter>>(
      `${environment.baseUrl}/api/v1/systemParameters`
    ).subscribe(data => {
      this.systemParameters = data;
      this.sysFectched.next(true);
    }, err => {
      console.log(err);
    });
  }


  getValue(key: string): string | undefined {
   return this.systemParameters.find(sys => sys.key === key)?.value;
  }

}
