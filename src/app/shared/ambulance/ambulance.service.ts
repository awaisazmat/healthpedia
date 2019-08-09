import { Injectable } from '@angular/core';
import { Ambulance } from './ambulance.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AmbulanceService {

  list : Ambulance[];

  readonly rootURL = "http://localhost:52673/api"

  constructor(private http: HttpClient) { }

  refreshList(){
    return this.http.get(this.rootURL+'/Ambulance/AllAmbulanceList')
    .toPromise().then(res => this.list = res as Ambulance[]);
   
  }

  postAmbulance (AmbulanceForm){
    console.log(AmbulanceForm);
    return this.http.post(this.rootURL+'/Ambulance/CreateAmbulance',AmbulanceForm);  
  }

  putAmbulance(AmbulanceForm){
    console.log(AmbulanceForm.AmbulanceId);
    return this.http.put(this.rootURL+'/Ambulance/UpdateAmbulance?id='+ AmbulanceForm.AmbulanceId, AmbulanceForm);
  }  

  deleteAmbulance(id:number){
    return this.http.delete(this.rootURL+'/Ambulance/'+ id);
    
  }
}
