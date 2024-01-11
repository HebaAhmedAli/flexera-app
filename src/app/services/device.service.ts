import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DeviceModel } from "../models/device.model";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private httpClient: HttpClient) {
   }

  public addNewDevice(form: FormData): Observable<HttpResponse<Object>> {

    return this.httpClient.post(`${environment.baseUrl}/api/v1/add-new-device`, form, { observe: 'response' });
  }

  public getDevices(): Observable<Array<DeviceModel>> {
    return this.httpClient.get<Array<DeviceModel>>(
      `${environment.baseUrl}/api/v1/my-devices`
    );
  }
}
