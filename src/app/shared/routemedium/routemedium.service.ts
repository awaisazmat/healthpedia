import { Injectable } from '@angular/core';
import { Routemedium } from './routemedium.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoutemediumService {

  list : Routemedium[];

  readonly rootURL = "http://localhost:52673/api"

  constructor(private http: HttpClient) { }

  refreshList(){
    return this.http.get(this.rootURL+'/RouteMedium/AllRouteMediumList')
    .toPromise().then(res => this.list = res as Routemedium[]);
  }

  postRoutemedium (Routemedium){
    console.log(Routemedium);
    return this.http.post(this.rootURL+'/RouteMedium/CreateRouteMedium',Routemedium);  
  }

  putRoutemedium(Routemedium){
    console.log(Routemedium.RouteMediumId);
    return this.http.put(this.rootURL+'/RouteMedium/UpdateRouteMedium?id='+ Routemedium.RouteMediumId, Routemedium);
  }  

  deleteRoutemedium(id:number){
    return this.http.delete(this.rootURL+'/RouteMedium/'+ id);
    
  }
}
