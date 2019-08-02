import { Injectable } from '@angular/core';

import { Currency } from './currency.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  list : Currency[];

  readonly rootURL = "http://localhost:52673/api"

  constructor(private http: HttpClient) { }

  refreshList(){
    return this.http.get(this.rootURL+'/Currency/AllCurrencyList')
    .toPromise().then(res => this.list = res as Currency[]);
  }

  postCurrency (Currency){
    console.log(Currency);
    return this.http.post(this.rootURL+'/Currency/CreateCurrency',Currency);  
  }

  putCurrency(Currency){
    console.log(Currency.CurrencyId);
    return this.http.put(this.rootURL+'/Currency/UpdateCurrency?id='+ Currency.CurrencyId, Currency);
  }  

  deleteCurrency(id:number){
    return this.http.delete(this.rootURL+'/Currency/'+ id);
    
  }
}
