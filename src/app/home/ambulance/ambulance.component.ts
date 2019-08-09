import { Component, OnInit } from '@angular/core';
import { AmbulanceService } from 'src/app/shared/ambulance/ambulance.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


declare var $: any;
@Component({
  selector: 'app-ambulance',
  templateUrl: './ambulance.component.html',
  styleUrls: ['./ambulance.component.css']
})
export class AmbulanceComponent implements OnInit {

  submitted = false;
  

  constructor(private service : AmbulanceService,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  ambulanceForm = this.fb.group({
   
    AmbulanceId :[null],
    AmbulanceName :['', Validators.required],
    DriverId  :[''],
    AmbulanceOriginPoint :[''],
    ServiceId :[''],
    UserId :['']
    // Created_Date :['']



  })

  get f() { return this.ambulanceForm.controls; }

  
  onSubmit(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.ambulanceForm.invalid) {
            return;
        }
    

    
 if(this.ambulanceForm.value.AmbulanceId==null){
     
      this.insertRecord();
      
    }
    else
      this.updateRecord();
  }


  insertRecord(){
      this.service.postAmbulance(this.ambulanceForm.value).subscribe(res=>{
      console.log(this.ambulanceForm.value);
      $("#myModal").modal("hide");
      this.toastr.success('Inserted Successfully!','Ambulance. Register');
      this.ambulanceForm.reset();   
      this.service.refreshList();

      console.log("Insert Successfull");
   
      }); 
   }  


   updateRecord(){
    this.service.putAmbulance(this.ambulanceForm.value).subscribe(res=>{
    $("#myModal").modal("hide");
     this.toastr.info('Updated Successfully!','Ambulance. Update');
    this.ambulanceForm.reset();
    this.service.refreshList();
    console.log("Update Successfull");
    }); 
 }

   populateForm(amb){
     console.log(amb);
     this.ambulanceForm.patchValue(amb);
  }

  onDelete(id: number){
    if(confirm("Are you sure?")){
    this.service.deleteAmbulance(id).subscribe(res => {
      this.toastr.warning('Deleted Successfully!','Ambulance. Remove');
      this.service.refreshList();
      console.log("Delete Successfull");
          
    })
  }
}

}
