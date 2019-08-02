import { Component, OnInit } from '@angular/core';
import { ProvinceService } from 'src/app/shared/province/province.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.css']
})
export class ProvinceComponent implements OnInit {

  submitted = false;
  

  constructor(private service : ProvinceService,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  provinceForm = this.fb.group({
   
    ProvinceId :[null],
    ProvinceName :['', Validators.required],
    CreatedDate  :['']

  })

  get f() { return this.provinceForm.controls; }

  
  onSubmit(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.provinceForm.invalid) {
            return;
        }
    

    
 if(this.provinceForm.value.ProvinceId==null){
     
      this.insertRecord();
      
    }
    else
      this.updateRecord();
  }


  insertRecord(){
      this.service.postProvince(this.provinceForm.value).subscribe(res=>{
      console.log(this.provinceForm.value);
      $("#myModal").modal("hide");
      this.toastr.success('Inserted Successfully!','Province. Register');
      this.provinceForm.reset();   
      this.service.refreshList();

      console.log("Insert Successfull");
   
      }); 
   }  


   updateRecord(){
    this.service.putProvince(this.provinceForm.value).subscribe(res=>{
    $("#myModal").modal("hide");
     this.toastr.info('Updated Successfully!','Province. Update');
    this.provinceForm.reset();
    this.service.refreshList();
    console.log("Update Successfull");
    }); 
 }

   populateForm(Province){
     console.log(Province);
     this.provinceForm.patchValue(Province);
  }

  onDelete(id: number){
    if(confirm("Are you sure?")){
    this.service.deleteProvince(id).subscribe(res => {
      this.toastr.warning('Deleted Successfully!','Province. Remove');
      this.service.refreshList();
      console.log("Delete Successfull");
          
    })
  }
}


}
