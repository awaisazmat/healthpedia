import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms"; 
import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './home/patient/patient.component';
import { DoctorComponent } from './home/doctor/doctor.component';
import { AmbulanceComponent } from './home/ambulance/ambulance.component';
import { PharmacyComponent } from './home/pharmacy/pharmacy.component';
import { AreaComponent } from './home/area/area.component';
import { ArticleComponent } from './home/article/article.component';
import { CityComponent } from './home/city/city.component';
import { CurrencyComponent } from './home/currency/currency.component';
import { MedicineComponent } from './home/medicine/medicine.component';
import { PaymentdetailsetupComponent } from './home/paymentdetailsetup/paymentdetailsetup.component';
import { RouteComponent } from './home/route/route.component';
import { ProvinceComponent } from './home/province/province.component';
import { RoutemediumComponent } from './home/routemedium/routemedium.component';
import { ServiceComponent } from './home/service/service.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
   
    HomeComponent,
   
    DoctorComponent,
   
    AmbulanceComponent,
   
    PharmacyComponent,
   
    AreaComponent,
   
    ArticleComponent,
   
    CityComponent,
   
    CurrencyComponent,
   
    MedicineComponent,
   
    PaymentdetailsetupComponent,
   
    RouteComponent,
   
    ProvinceComponent,
   
    RoutemediumComponent,
   
    ServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DatePickerModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
