import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HospitalComponent } from './hospital/hospital.component';

@NgModule({
  declarations: [HospitalComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule 
  ]
})
export class HomeModule { }
