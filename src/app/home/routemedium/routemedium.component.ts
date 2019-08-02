import { Component, OnInit } from '@angular/core';
import { RoutemediumService } from 'src/app/shared/routemedium/routemedium.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-routemedium',
  templateUrl: './routemedium.component.html',
  styleUrls: ['./routemedium.component.css']
})
export class RoutemediumComponent implements OnInit {

  submitted = false;
  

  constructor(private service : RoutemediumService,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  routeMediumForm = this.fb.group({
    
    RouteMediumId :[null],
    RouteMediumName :['', Validators.required],
    Created_Date  :['']
    



  })

  get f() { return this.routeMediumForm.controls; }

  
  onSubmit(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.routeMediumForm.invalid) {
            return;
        }
    

    
 if(this.routeMediumForm.value.RouteMediumId==null){
     
      this.insertRecord();
      
    }
    else
      this.updateRecord();
  }


  insertRecord(){
      this.service.postRoutemedium(this.routeMediumForm.value).subscribe(res=>{
      console.log(this.routeMediumForm.value);
      $("#myModal").modal("hide");
      this.toastr.success('Inserted Successfully!','Routemedium. Register');
      this.routeMediumForm.reset();   
      this.service.refreshList();

      console.log("Insert Successfull");
   
      }); 
   }  


   updateRecord(){
    this.service.putRoutemedium(this.routeMediumForm.value).subscribe(res=>{
    $("#myModal").modal("hide");
     this.toastr.info('Updated Successfully!','Routemedium. Update');
    this.routeMediumForm.reset();
    this.service.refreshList();
    console.log("Update Successfull");
    }); 
 }

   populateForm(Routemedium){
     console.log(Routemedium);
     this.routeMediumForm.patchValue(Routemedium);
  }

  onDelete(id: number){
    if(confirm("Are you sure?")){
    this.service.deleteRoutemedium(id).subscribe(res => {
      this.toastr.warning('Deleted Successfully!','Routemedium. Remove');
      this.service.refreshList();
      console.log("Delete Successfull");
          
    })
  }
}

}
