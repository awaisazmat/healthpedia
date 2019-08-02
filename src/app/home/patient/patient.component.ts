import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from 'src/app/shared/patient/patient.service';


declare var $: any;
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})

export class PatientComponent implements OnInit {
  
  submitted = false;
   

  constructor(
    private fb: FormBuilder,
    private service : PatientService,
    private toastr: ToastrService
   
  ) { }

 

  ngOnInit() {
 
    this.service.refreshList(); 
  }

  patientForm = this.fb.group({
    SysPatientId : [null],
    PatientName : ['', Validators.required],
    FatherHusband : [''],
    ContactNo_ : [''],
    DoctorWhatsapp : [''],
    DoctorEmail : [''],
    PaymentTypeId : [''],
    CreatedDate : [''],
    CNIC : [''],
    DOB : [''],
    MartialStatus : ['Single'],
    Gender : ['Male'],
    PermanentAddress : [''],
    PresentAddress : [''],
    MonthlyIncome : ['']

  })

  get f() { return this.patientForm.controls; }

  
  onSubmit(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.patientForm.invalid) {
            return;
        }
    

    
 if(this.patientForm.value.SysPatientId==null){
     
      this.insertRecord();
      
    }
    else
      this.updateRecord();
  }


  insertRecord(){
      this.service.postPatient(this.patientForm.value).subscribe(res=>{
      console.log(this.patientForm.value);
      $("#myModal").modal("hide");
      this.toastr.success('Inserted Successfully!','Patient. Register');
      this.patientForm.reset();   
      this.service.refreshList();

      console.log("Insert Successfull");
   
      }); 
   }  


   updateRecord(){
    this.service.putPatient(this.patientForm.value).subscribe(res=>{
    $("#myModal").modal("hide");
     this.toastr.info('Updated Successfully!','Patient. Update');
    this.patientForm.reset();
    this.service.refreshList();
    console.log("Update Successfull");
    }); 
 }

   populateForm(pnt){
     console.log(pnt);
     this.patientForm.patchValue(pnt);
  }

  onDelete(id: number){
    if(confirm("Are you sure?")){
    this.service.deletePatient(id).subscribe(res => {
      this.toastr.warning('Deleted Successfully!','Patient. Remove');
      this.service.refreshList();
      console.log("Delete Successfull");
          
    })
  }
}
  
 
}
