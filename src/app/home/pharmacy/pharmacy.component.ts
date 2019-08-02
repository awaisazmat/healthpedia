import { Component, OnInit } from '@angular/core';
import { PharmacyService } from 'src/app/shared/pharmacy/pharmacy.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css']
})
export class PharmacyComponent implements OnInit {

  submitted = false;
  

  constructor(private service : PharmacyService,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  pharmacyForm = this.fb.group({
     
    PhamrmacyId :[null],
    PharmacyName :['', Validators.required],
    PharmacyAddress  :[''],
    PharmacyRegNo :[''],
    PharmacyContactNo :[''],
    PhrmacyContactNo1 :[''],
    PharmacyEmail :[''],
    AreaId :[''],
    CityId :[''],
    ProvinceId :[''],
    PaymentTypeId :[''],
    ProductId :[''],
    UserId :[''],
    CreatedDate :['']



  })

  get f() { return this.pharmacyForm.controls; }

  
  onSubmit(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.pharmacyForm.invalid) {
            return;
        }
    

    
 if(this.pharmacyForm.value.PhamrmacyId==null){
     
      this.insertRecord();
      
    }
    else
      this.updateRecord();
  }


  insertRecord(){
      this.service.postPharmacy(this.pharmacyForm.value).subscribe(res=>{
      console.log(this.pharmacyForm.value);
      $("#myModal").modal("hide");
      this.toastr.success('Inserted Successfully!','Pharmacy. Register');
      this.pharmacyForm.reset();   
      this.service.refreshList();

      console.log("Insert Successfull");
   
      }); 
   }  


   updateRecord(){
    this.service.putPharmacy(this.pharmacyForm.value).subscribe(res=>{
    $("#myModal").modal("hide");
     this.toastr.info('Updated Successfully!','Pharmacy. Update');
    this.pharmacyForm.reset();
    this.service.refreshList();
    console.log("Update Successfull");
    }); 
 }

   populateForm(Pharmacy){
     console.log(Pharmacy);
     this.pharmacyForm.patchValue(Pharmacy);
  }

  onDelete(id: number){
    if(confirm("Are you sure?")){
    this.service.deletePharmacy(id).subscribe(res => {
      this.toastr.warning('Deleted Successfully!','Pharmacy. Remove');
      this.service.refreshList();
      console.log("Delete Successfull");
          
    })
  }
}

}
