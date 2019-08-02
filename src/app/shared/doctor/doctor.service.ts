import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Doctor } from './doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
 
  list : Doctor[];

  readonly rootURL = "http://localhost:52673/api"

  constructor(private http: HttpClient) { }

  refreshList(){
    return this.http.get(this.rootURL+'/Doctor/AllDoctorList')
    .toPromise().then(res => this.list = res as Doctor[]);
  }

  postDoctor (doctorForm){
    console.log(doctorForm);
    return this.http.post(this.rootURL+'/Doctor/CreateDoctor',doctorForm);  
  }

  putDoctor(doctorForm){
    console.log(doctorForm.SysDoctorId);
    return this.http.put(this.rootURL+'/Doctor/UpdateDoctor?id='+ doctorForm.SysDoctorId, doctorForm);
  }  

  deleteDoctor(id:number){
    return this.http.delete(this.rootURL+'/Doctor/'+ id);
    
  }

  
}    




 