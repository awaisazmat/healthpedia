import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/shared/doctor/doctor.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

declare var $: any;
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  tabs1 = [
    {
      active: true,
      name: 'Personal Info',
      icon: 'profile'
    }
  ];
  tabs2 = [
    {
      active: true,
      name: 'Qualification',
      icon: 'read'
    }
  ];
  tabs3 = [
    {
      active: true,
      name: 'Experience',
      icon: 'plus-square'
    }
  ];
  tabs4 = [
    {
      active: true,
      name: 'Options',
      icon: 'setting'
    }
  ];
  
  submitted = false;
  

  constructor(private service : DoctorService,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  doctorForm = this.fb.group({
    SysDoctorId: [null],
    SysClinicId: [''],
    SysHospitalId: [''],
    ServiceId: [''],
    DoctorName: ['', Validators.required],
    FatherHusband: [''],
    RegNo: [''],
    CNIC: [''],
    DOB: [''],
    DoctorWhatsapp: [''], 
    ContactNo_: [''],
    MartialStatus: ['Single'],
    Gender: ['Male'],
    DoctorEmail: ['',[Validators.required, Validators.email]],
    Specialization: [''],
    PresentAddress: [''],
    PermanentAddress: [''],
    HospitalClinicAddress: [''],
    IssueDate: [''],
    validitydate: [''], 
    Qualification: [''], 
    Institute: [''],
    year: [''],
    country: ['']



  })

  get f() { return this.doctorForm.controls; }

  
  onSubmit(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.doctorForm.invalid) {
            return;
        }
    

    
 if(this.doctorForm.value.SysDoctorId==null){
     
      this.insertRecord();
      
    }
    else
      this.updateRecord();
  }


  insertRecord(){
      this.service.postDoctor(this.doctorForm.value).subscribe(res=>{
      console.log(this.doctorForm.value);
      $("#myModal").modal("hide");
      this.toastr.success('Inserted Successfully!','Doctor. Register');
      this.doctorForm.reset();   
      this.service.refreshList();

      console.log("Insert Successfull");
   
      }); 
   }  


   updateRecord(){
    this.service.putDoctor(this.doctorForm.value).subscribe(res=>{
    $("#myModal").modal("hide");
     this.toastr.info('Updated Successfully!','Doctor. Update');
    this.doctorForm.reset();
    this.service.refreshList();
    console.log("Update Successfull");
    }); 
 }

   populateForm(doc){
     console.log(doc);
     this.doctorForm.patchValue(doc);
  }

  onDelete(id: number){
    if(confirm("Are you sure?")){
    this.service.deleteDoctor(id).subscribe(res => {
      this.toastr.warning('Deleted Successfully!','Doctor. Remove');
      this.service.refreshList();
      console.log("Delete Successfull");
          
    })
  }
}

    
}


