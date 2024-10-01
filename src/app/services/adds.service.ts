import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Adds } from '../models/adds.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddsService {

  constructor(private httpClient: HttpClient) { }

  getAddss(): Observable<Adds[]> {
    return this.httpClient.get<Adds[]>(`${environment.baseUrl}/api/v1/addss`);
  }


}
