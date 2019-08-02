import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Patient } from './patient.model';



@Injectable({
  providedIn: 'root'
})
export class PatientService {
 
  list : Patient[];

  readonly rootURL = "http://localhost:52673/api"

  constructor(private http: HttpClient,
   ) { }

  refreshList(){
    return this.http.get(this.rootURL+'/Patient/AllPatientList')
    .toPromise().then(res => this.list = res as Patient[]);
  }

  postPatient(patientForm){
    console.log(patientForm);
    return this.http.post(this.rootURL+'/Patient/CreatePatient',patientForm);  
  }

  putPatient(patientForm){
    console.log(patientForm.SysPatientId);
    return this.http.put(this.rootURL+'/Patient/UpdatePatient?id='+ patientForm.SysPatientId, patientForm);
  }  

  deletePatient(id:number){
    return this.http.delete(this.rootURL+'/Patient/'+ id);
    
  }

}
