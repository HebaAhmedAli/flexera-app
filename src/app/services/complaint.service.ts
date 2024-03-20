import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Complaint } from '../models/complaint.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private url = `${environment.baseUrl}/api/v1/complaints`;

  constructor(private http: HttpClient) { }

  createComplaint(complaintRequest: Complaint) {
    return this.http.post(`${this.url}`, complaintRequest);
  }
}
