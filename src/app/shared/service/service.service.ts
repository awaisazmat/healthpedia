import { Injectable } from '@angular/core';
import { Service } from './service.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  list : Service[];

  readonly rootURL = "http://localhost:52673/api"

  constructor(private http: HttpClient) { }

  refreshList(){
    console.log("this is here");
    return this.http.get(this.rootURL+'/Service/AllServiceList')
    .toPromise().then(res => this.list = res as Service[]); 
  }

  postService (Service){
    console.log(Service);
    return this.http.post(this.rootURL+'/Service/CreateService',Service);  
  }

  putService(Service){
    console.log(Service.ServiceId);
    return this.http.put(this.rootURL+'/Service/UpdateService?id='+ Service.ServiceId, Service);
  }  

  deleteService(id:number){
    return this.http.delete(this.rootURL+'/Service/'+ id);
    
  }
}
