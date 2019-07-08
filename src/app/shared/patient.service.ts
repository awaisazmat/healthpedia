import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Patient } from './patient.model';



@Injectable({
  providedIn: 'root'
})
export class PatientService {
  formData : Patient;
  list : Patient[];

  readonly rootURL = "http://localhost:52673/api"

  constructor(private http: HttpClient,
   ) { }

  refreshList(){
    return this.http.get(this.rootURL+'/Patient/AllPatientList')
    .toPromise().then(res => this.list = res as Patient[]);
  }

  postPatient(formData: Patient){
    return this.http.post(this.rootURL+'/Patient/CreatePatient', formData);
    
  }

  putPatient(formData: Patient){
    return this.http.put(this.rootURL+'/Patient/UpdatePatient'+formData.SysPatientId, formData);
  }

  deletePatient(id:number){
    return this.http.delete(this.rootURL+'/Patient/'+ id);
  }
}
