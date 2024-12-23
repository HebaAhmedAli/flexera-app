import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Maintenece } from '../models/maintenence.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainteneceService {

  private url = `${environment.baseUrl}/api/v1/add-maintenence`;

  constructor(private http: HttpClient) { }

  createMaintenece(mainteneceRequest: Maintenece) {
    return this.http.post(`${this.url}`, mainteneceRequest);
  }

  public getMaintenece(mainteneceId: number, phone: string): Observable<Maintenece> {
    return this.http.get<Maintenece>(
      `${environment.baseUrl}/api/v1/maintenences/${mainteneceId}/${phone}`
    );
  }
}
