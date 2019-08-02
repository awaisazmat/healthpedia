import { Injectable } from '@angular/core';
import { Paymentdetailsetup } from './paymentdetailsetup.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentdetailsetupService {

  list : Paymentdetailsetup[];

  readonly rootURL = "http://localhost:52673/api"

  constructor(private http: HttpClient) { }

  refreshList(){
    return this.http.get(this.rootURL+'/PaymentDetailSetup/AllPaymentDetailSetupList')
    .toPromise().then(res => this.list = res as Paymentdetailsetup[]);
  }

  postPaymentDetailSetup (PaymentDetailSetup){
    console.log(PaymentDetailSetup);
    return this.http.post(this.rootURL+'/PaymentDetailSetup/CreatePaymentDetailSetup',PaymentDetailSetup);  
  }

  putPaymentDetailSetup(PaymentDetailSetup){
    console.log(PaymentDetailSetup.PaymentTypeId);
    return this.http.put(this.rootURL+'/PaymentDetailSetup/UpdatePaymentDetailSetup?id='+ PaymentDetailSetup.PaymentTypeId, PaymentDetailSetup);
  }  

  deletePaymentDetailSetup(id:number){
    return this.http.delete(this.rootURL+'/PaymentDetailSetup/'+ id);
    
  }
}
