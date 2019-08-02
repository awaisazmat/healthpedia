import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/shared/city/city.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  submitted = false;
  

  constructor(private service : CityService,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  cityForm = this.fb.group({

    CityId :[null],
    CityName :['', Validators.required],
    ProvinceId  :[''],
    CreatedDate_ :['']
   



  })

  get f() { return this.cityForm.controls; }

  
  onSubmit(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.cityForm.invalid) {
            return;
        }
    

    
 if(this.cityForm.value.CityId==null){
     
      this.insertRecord();
      
    }
    else
      this.updateRecord();
  }


  insertRecord(){
      this.service.postCity(this.cityForm.value).subscribe(res=>{
      console.log(this.cityForm.value);
      $("#myModal").modal("hide");
      this.toastr.success('Inserted Successfully!','City. Register');
      this.cityForm.reset();   
      this.service.refreshList();

      console.log("Insert Successfull");
   
      }); 
   }  


   updateRecord(){
    this.service.putCity(this.cityForm.value).subscribe(res=>{
    $("#myModal").modal("hide");
     this.toastr.info('Updated Successfully!','City. Update');
    this.cityForm.reset();
    this.service.refreshList();
    console.log("Update Successfull");
    }); 
 }

   populateForm(City){
     console.log(City);
     this.cityForm.patchValue(City);
  }

  onDelete(id: number){
    if(confirm("Are you sure?")){
    this.service.deleteCity(id).subscribe(res => {
      this.toastr.warning('Deleted Successfully!','City. Remove');
      this.service.refreshList();
      console.log("Delete Successfull");
          
    })
  }
}


}
