import { Component, OnInit } from '@angular/core';
import { AreaService } from 'src/app/shared/area/area.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

declare var $: any;
@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  submitted = false;
  

  constructor(private service : AreaService,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  areaForm = this.fb.group({
   
    AreaId :[null],
    AreaName :['',Validators.required],
    CityId :['']
  
  })

  get f() { return this.areaForm.controls; }

  
  onSubmit(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.areaForm.invalid) {
            return;
        }
    

    
 if(this.areaForm.value.AreaId==null){
     
      this.insertRecord();
      
    }
    else
      this.updateRecord();
  }


  insertRecord(){
      this.service.postArea(this.areaForm.value).subscribe(res=>{
      console.log(this.areaForm.value);
      $("#myModal").modal("hide");
      this.toastr.success('Inserted Successfully!','Area. Register');
      this.areaForm.reset();   
      this.service.refreshList();

      console.log("Insert Successfull");
   
      }); 
   }  


   updateRecord(){
    this.service.putArea(this.areaForm.value).subscribe(res=>{
    $("#myModal").modal("hide");
     this.toastr.info('Updated Successfully!','Area. Update');
    this.areaForm.reset();
    this.service.refreshList();
    console.log("Update Successfull");
    }); 
 }

   populateForm(area){
     console.log(area);
     this.areaForm.patchValue(area);
  }

  onDelete(id: number){
    if(confirm("Are you sure?")){
    this.service.deleteArea(id).subscribe(res => {
      this.toastr.warning('Deleted Successfully!','Area. Remove');
      this.service.refreshList();
      console.log("Delete Successfull");
          
    })
  }
}

}
