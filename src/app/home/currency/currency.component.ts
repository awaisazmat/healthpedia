import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/shared/currency/currency.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  submitted = false;
  

  constructor(private service : CurrencyService,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  currencyForm = this.fb.group({
   
    CurrencyId :[null],
    CurrencyName :['', Validators.required],
    CreateDate_  :['']
    



  })

  get f() { return this.currencyForm.controls; }

  
  onSubmit(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.currencyForm.invalid) {
            return;
        }
    

    
 if(this.currencyForm.value.CurrencyId==null){
     
      this.insertRecord();
      
    }
    else
      this.updateRecord();
  }


  insertRecord(){
      this.service.postCurrency(this.currencyForm.value).subscribe(res=>{
      console.log(this.currencyForm.value);
      $("#myModal").modal("hide");
      this.toastr.success('Inserted Successfully!','Currency. Register');
      this.currencyForm.reset();   
      this.service.refreshList();

      console.log("Insert Successfull");
   
      }); 
   }  


   updateRecord(){
    this.service.putCurrency(this.currencyForm.value).subscribe(res=>{
    $("#myModal").modal("hide");
     this.toastr.info('Updated Successfully!','Currency. Update');
    this.currencyForm.reset();
    this.service.refreshList();
    console.log("Update Successfull");
    }); 
 }

   populateForm(Currency){
     console.log(Currency);
     this.currencyForm.patchValue(Currency);
  }

  onDelete(id: number){
    if(confirm("Are you sure?")){
    this.service.deleteCurrency(id).subscribe(res => {
      this.toastr.warning('Deleted Successfully!','Currency. Remove');
      this.service.refreshList();
      console.log("Delete Successfull");
          
    })
  }
}

}
