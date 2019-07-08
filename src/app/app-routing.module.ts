import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { PatientComponent } from './home/patient/patient.component';
import { DoctorComponent } from './home/doctor/doctor.component';
import { AmbulanceComponent } from './home/ambulance/ambulance.component';
import { AreaComponent } from './home/area/area.component';
import { ArticleComponent } from './home/article/article.component';
import { CityComponent } from './home/city/city.component';
import { CurrencyComponent } from './home/currency/currency.component';
import { MedicineComponent } from './home/medicine/medicine.component';
import { PaymentdetailsetupComponent } from './home/paymentdetailsetup/paymentdetailsetup.component';
import { PharmacyComponent } from './home/pharmacy/pharmacy.component';
import { ProvinceComponent } from './home/province/province.component';
import { RouteComponent } from './home/route/route.component';
import { RoutemediumComponent } from './home/routemedium/routemedium.component';
import { ServiceComponent } from './home/service/service.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'doctor', component: DoctorComponent },
  { path: 'ambulance', component: AmbulanceComponent },
  { path: 'area', component: AreaComponent },
  { path: 'article', component:  ArticleComponent},
  { path: 'city', component:  CityComponent},
  { path: 'currency', component:  CurrencyComponent},
  { path: 'medicine', component: MedicineComponent },
  { path: 'paymentdetailsetup', component: PaymentdetailsetupComponent },
  { path: 'pharmacy', component:  PharmacyComponent},
  { path: 'province', component:  ProvinceComponent},
  { path: 'route', component: RouteComponent },
  { path: 'routemedium', component: RoutemediumComponent},
  { path: 'service', component: ServiceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
