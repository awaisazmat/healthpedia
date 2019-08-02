import { Injectable } from '@angular/core';
import { Pharmacy } from './pharmacy.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {

  list : Pharmacy[];

  readonly rootURL = "http://localhost:52673/api"

  constructor(private http: HttpClient) { }

  refreshList(){
    return this.http.get(this.rootURL+'/Pharmacy/AllPharmacyList')
    .toPromise().then(res => this.list = res as Pharmacy[]);
  }

  postPharmacy (Pharmacy){
    console.log(Pharmacy);
    return this.http.post(this.rootURL+'/Pharmacy/CreatePharmacy',Pharmacy);  
  }

  putPharmacy(Pharmacy){
    console.log(Pharmacy.PhamrmacyId);
    return this.http.put(this.rootURL+'/Pharmacy/UpdatePharmacy?id='+ Pharmacy.PhamrmacyId, Pharmacy);
  }  

  deletePharmacy(id:number){
    return this.http.delete(this.rootURL+'/Pharmacy/'+ id);
    
  }
}
