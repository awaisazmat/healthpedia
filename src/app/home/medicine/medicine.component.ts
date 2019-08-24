import { Component, OnInit } from '@angular/core';
import { MedicineService } from 'src/app/shared/medicine/medicine.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {

  submitted = false;
  

  constructor(private service : MedicineService,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  medicineForm = this.fb.group({
   
    MedicineId :[null],
    MedicineName :['', Validators.required],
    MedicineManufacturinDate  :[''],
    MedicineExpiryDate :[''],
    MedicineStock :[''],
    MedicineUnit :[''],
    PharmacyId :['']


  })

  get f() { return this.medicineForm.controls; }

  
  onSubmit(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.medicineForm.invalid) {
            return;
        }
    

    
 if(this.medicineForm.value.MedicineId==null){
     
      this.insertRecord();
      
    }
    else
      this.updateRecord();
  }


  insertRecord(){
      this.service.postMedicine(this.medicineForm.value).subscribe(res=>{
      console.log(this.medicineForm.value);
      $("#myModal").modal("hide");
      this.toastr.success('Inserted Successfully!','Medicine. Register');
      this.medicineForm.reset();   
      this.service.refreshList();

      console.log("Insert Successfull");
   
      }); 
   }  


   updateRecord(){
    this.service.putMedicine(this.medicineForm.value).subscribe(res=>{
    $("#myModal").modal("hide");
     this.toastr.info('Updated Successfully!','Medicine. Update');
    this.medicineForm.reset();
    this.service.refreshList();
    console.log("Update Successfull");
    }); 
 }

   populateForm(Medicine){
     console.log(Medicine);
     this.medicineForm.patchValue(Medicine);
  }

  onDelete(id: number){
    if(confirm("Are you sure?")){
    this.service.deleteMedicine(id).subscribe(res => {
      this.toastr.warning('Deleted Successfully!','Medicine. Remove');
      this.service.refreshList();
      console.log("Delete Successfull");
          
    })
  }
}

}
