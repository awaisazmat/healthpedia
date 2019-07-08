import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Doctor } from './doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  formData : Doctor;
  list : Doctor[];

  readonly rootURL = "http://localhost:52673/api"

  constructor(private http: HttpClient) { }

  refreshList(){
    return this.http.get(this.rootURL+'/Doctor/AllDoctorList')
    .toPromise().then(res => this.list = res as Doctor[]);
  }
}
