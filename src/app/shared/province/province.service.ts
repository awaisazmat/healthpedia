import { Injectable } from '@angular/core';
import { Province } from './province.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  list : Province[];

  readonly rootURL = "http://localhost:52673/api"

  constructor(private http: HttpClient) { }

  refreshList(){
    return this.http.get(this.rootURL+'/Province/AllProvinceList')
    .toPromise().then(res => this.list = res as Province[]);
  }

  postProvince (Province){
    console.log(Province);
    return this.http.post(this.rootURL+'/Province/CreateProvince',Province);  
  }

  putProvince(Province){
    console.log(Province.ProvinceId);
    return this.http.put(this.rootURL+'/Province/UpdateProvince?id='+ Province.ProvinceId, Province);
  }  

  deleteProvince(id:number){
    return this.http.delete(this.rootURL+'/Province/'+ id);
    
  }
}
