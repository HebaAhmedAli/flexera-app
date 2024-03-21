import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KeyValue } from '@angular/common';
import { LookupItem } from '../models/lookup-item.model';

@Injectable({
  providedIn: 'root'
})
export class LookupItemsService {

  lookupItems: LookupItem[] = [];

  constructor(private httpClient: HttpClient) { }


  public getlookupItems(): void {
   this.httpClient.get<Array<LookupItem>>(
      `${environment.baseUrl}/api/v1/lookupItems`
    ).subscribe(data => {
      this.lookupItems = data;
    }, err => {
      console.log(err);
    });
  }


  getLookupByGroup(groupName: string): LookupItem[]  {
   return this.lookupItems.filter(lookup => lookup.groupName === groupName);
  }

}
