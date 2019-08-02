import { Injectable } from '@angular/core';
import { Area } from './area.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  list : Area[];

  readonly rootURL = "http://localhost:52673/api"

  constructor(private http: HttpClient) { } 

  refreshList(){
    console.log('jsansakcj');   
    return this.http.get(this.rootURL+'/Area/AllAreaList')
    .toPromise().then(res => this.list = res as Area[]);    
  }

  postArea (AreaForm){
    console.log(AreaForm);
    return this.http.post(this.rootURL+'/Area/CreateArea',AreaForm);  
  }

  putArea(AreaForm){
    console.log(AreaForm.AreaId);
    return this.http.put(this.rootURL+'/Area/UpdateArea?id='+ AreaForm.AreaId, AreaForm);
  }  

  deleteArea(id:number){
    return this.http.delete(this.rootURL+'/Area/'+ id);
    
  }
}  
