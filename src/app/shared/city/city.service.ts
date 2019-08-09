import { Injectable } from '@angular/core';

import { City } from './city.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
}) 
export class CityService {

  list : City[];
 
  readonly rootURL = "http://localhost:52673/api"

  constructor(private http: HttpClient) { }

  refreshList(){
    
    return this.http.get(this.rootURL+'/City/AllCityList')
    .toPromise().then(res => this.list = res as City[]);
    
  }

  postCity (CityForm){
    console.log(CityForm);
    return this.http.post(this.rootURL+'/City/CreateCity',CityForm);  
  }

  putCity(CityForm){ 
    console.log(CityForm.CityId);
    return this.http.put(this.rootURL+'/City/UpdateCity?id='+ CityForm.CityId, CityForm);
  }  

  deleteCity(id:number){
    return this.http.delete(this.rootURL+'/City/'+ id);
    
  }
}
