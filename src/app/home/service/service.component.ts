import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/shared/service/service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  submitted = false;
  

  constructor(private service : ServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  serviceForm = this.fb.group({
    
    ServiceId :[null],
    ServiceName :['', Validators.required],
    Charges  :[''],
    CreatedDate :['']



  })

  get f() { return this.serviceForm.controls; }

  
  onSubmit(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.serviceForm.invalid) {
            return;
        }
    

    
 if(this.serviceForm.value.ServiceId==null){
     
      this.insertRecord();
      
    }
    else
      this.updateRecord();
  }


  insertRecord(){
      this.service.postService(this.serviceForm.value).subscribe(res=>{
      console.log(this.serviceForm.value);
      $("#myModal").modal("hide");
      this.toastr.success('Inserted Successfully!','Service. Register');
      this.serviceForm.reset();   
      this.service.refreshList();

      console.log("Insert Successfull");
   
      }); 
   }  


   updateRecord(){
    this.service.putService(this.serviceForm.value).subscribe(res=>{
    $("#myModal").modal("hide");
     this.toastr.info('Updated Successfully!','Service. Update');
    this.serviceForm.reset();
    this.service.refreshList();
    console.log("Update Successfull");
    }); 
 }

   populateForm(Service){
     console.log(Service);
     this.serviceForm.patchValue(Service);
  }

  onDelete(id: number){
    if(confirm("Are you sure?")){
    this.service.deleteService(id).subscribe(res => {
      this.toastr.warning('Deleted Successfully!','Service. Remove');
      this.service.refreshList();
      console.log("Delete Successfull");
          
    })
  }
}

}
