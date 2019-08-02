import { Injectable } from '@angular/core';
import { Medicine } from './medicine.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  list : Medicine[];

  readonly rootURL = "http://localhost:52673/api"

  constructor(private http: HttpClient) { }

  refreshList(){
    return this.http.get(this.rootURL+'/Medicine/AllMedicineList')
    .toPromise().then(res => this.list = res as Medicine[]);
  }

  postMedicine (MedicineForm){
    console.log(MedicineForm);
    return this.http.post(this.rootURL+'/Medicine/CreateMedicine',MedicineForm);  
  }

  putMedicine(MedicineForm){
    console.log(MedicineForm.MedicineId);
    return this.http.put(this.rootURL+'/Medicine/UpdateMedicine?id='+ MedicineForm.MedicineId, MedicineForm);
  }  

  deleteMedicine(id:number){
    return this.http.delete(this.rootURL+'/Medicine/'+ id);
    
  }
}
