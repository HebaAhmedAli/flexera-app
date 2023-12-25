import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CityModel } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {


  constructor(private httpClient: HttpClient) { }


  public getCities(): Observable<Array<CityModel>> {
    return this.httpClient.get<Array<CityModel>>(
      `${environment.baseUrl}/api/v1/cities`
    );
  }

}
