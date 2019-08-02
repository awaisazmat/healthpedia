import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/shared/route/route.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  submitted = false;
  

  constructor(private service : RouteService,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  routeForm = this.fb.group({
    
    RouteType :[null],
    RouteTypeName :['', Validators.required],
    RouteMediumId  :[''],
    Created_Date :['']
   



  })

  get f() { return this.routeForm.controls; }

  
  onSubmit(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.routeForm.invalid) {
            return;
        }
    

    
 if(this.routeForm.value.RouteType==null){
     
      this.insertRecord();
      
    }
    else
      this.updateRecord();
  }


  insertRecord(){
      this.service.postRoute(this.routeForm.value).subscribe(res=>{
      console.log(this.routeForm.value);
      $("#myModal").modal("hide");
      this.toastr.success('Inserted Successfully!','Route. Register');
      this.routeForm.reset();   
      this.service.refreshList();

      console.log("Insert Successfull");
   
      }); 
   }  


   updateRecord(){
    this.service.putRoute(this.routeForm.value).subscribe(res=>{
    $("#myModal").modal("hide");
     this.toastr.info('Updated Successfully!','Route. Update');
    this.routeForm.reset();
    this.service.refreshList();
    console.log("Update Successfull");
    }); 
 }

   populateForm(Route){
     console.log(Route);
     this.routeForm.patchValue(Route);
  }

  onDelete(id: number){
    if(confirm("Are you sure?")){
    this.service.deleteRoute(id).subscribe(res => {
      this.toastr.warning('Deleted Successfully!','Route. Remove');
      this.service.refreshList();
      console.log("Delete Successfull");
          
    })
  }
}


}
