import { Component, OnInit } from '@angular/core';


import { NgForm } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Patient } from 'src/app/shared/patient.model';
import { PatientService } from 'src/app/shared/patient.service';


declare var $: any;
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})

export class PatientComponent implements OnInit {
  // serviceList:any;
  // formData:any;
   formData = {
      SysPatientId :null,
    PatientName : '',
    ContactNo_ : '',
    PatientAddress : '',
    DoctorWhatsapp : '',
    DoctorEmail : '',
    PaymentTypeId : null,
    CreatedDate : ''
    }

    

  


  constructor(

    private service : PatientService,
    private toastr: ToastrService
   
  ) { }

 

  ngOnInit() {
    // this.formData=this.service.formData;
    // setTimeout(() => {
    //    console.log(this.formData,"formData");
    //    console.log(this.serviceList);
    // }, 5000);
   
    this.service.refreshList();
    // this.serviceList=this.service.list;
  
    
   
    
  }
  // resetForm(form?: NgForm){
  //   if(form != null)
  //   form.resetForm();
  //   this.service.formData = {
  //     SysPatientId :null,
  //   PatientName : '',
  //   ContactNo_ : '',
  //   PatientAddress : '',
  //   DoctorWhatsapp : '',
  //   DoctorEmail : '',
  //   PaymentTypeId : null,
  //   CreatedDate : ''
  //   }
  // }

  onSubmit(form: NgForm){
    if(form.value.SysPatientId ==null)
    this.insertRecord(form); 

    else
    this.updateRecord(form);

  }

  updateRecord(form: NgForm){
    this.service.putPatient(form.value).subscribe(res=>{
      $("#myModal").modal("hide");
      form.reset();
      this.toastr.info('Updated Successfully!','Patient');
  this.service.refreshList();
    });
    
      
   
  
 }


  populateForm(pnt: Patient){
    this.formData=Object.assign({},pnt);
  }

  insertRecord(form: NgForm){
    this.service.postPatient(form.value).subscribe(res=>{
      
      $("#myModal").modal("hide");
      form.reset();
      this.toastr.success('Inserted Successfully!','New Patient');
      
    this.service.refreshList();
   
      }); 
    
   }

   onDelete(id: number){
    if(confirm("Are you sure?")){
    this.service.deletePatient(id).subscribe(res => {
      this.service.refreshList();
      this.toastr.warning('Deleted Successfully!');
      
         
    })
  }
}

  // insertRecord(form: NgForm){
  //   console.log(form,"insert")
  //   this.service.postEmployee(form.value).subscribe(res=>{
     
  //     this.resetForm(form);
  //     this.service.refreshList();
  //   });
  //  }

  // populateForm(pnt: Patient){
  //   this.service.formData=Object.assign({},pnt);

  

  
  // }

}
