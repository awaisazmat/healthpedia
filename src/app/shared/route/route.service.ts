import { Injectable } from '@angular/core';
import { Route } from './route.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  list : Route[];

  readonly rootURL = "http://localhost:52673/api"

  constructor(private http: HttpClient) { }

  refreshList(){
    return this.http.get(this.rootURL+'/Route/AllRouteList')
    .toPromise().then(res => this.list = res as Route[]);
  }

  postRoute (Route){
    console.log(Route);
    return this.http.post(this.rootURL+'/Route/CreateRoute',Route);  
  }

  putRoute(Route){
    console.log(Route.RouteType);
    return this.http.put(this.rootURL+'/Route/UpdateRoute?id='+ Route.RouteType, Route);
  }  

  deleteRoute(id:number){
    return this.http.delete(this.rootURL+'/Route/'+ id);
    
  }
}
