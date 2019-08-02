import { Component, OnInit } from '@angular/core';
import { PaymentdetailsetupService } from 'src/app/shared/paymentdetailsetup/paymentdetailsetup.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-paymentdetailsetup',
  templateUrl: './paymentdetailsetup.component.html',
  styleUrls: ['./paymentdetailsetup.component.css']
})
export class PaymentdetailsetupComponent implements OnInit {

  submitted = false;
  

  constructor(private service : PaymentdetailsetupService,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  paymentDetailSetupForm = this.fb.group({
   
    PaymentTypeId :[null],
    PaymentName :['', Validators.required],
    PaymentMedium  :[''],
    Created_Date :['']



  })

  get f() { return this.paymentDetailSetupForm.controls; }

  
  onSubmit(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.paymentDetailSetupForm.invalid) {
            return;
        }
    

    
 if(this.paymentDetailSetupForm.value.PaymentTypeId==null){
     
      this.insertRecord();
      
    }
    else
      this.updateRecord();
  }


  insertRecord(){
      this.service.postPaymentDetailSetup(this.paymentDetailSetupForm.value).subscribe(res=>{
      console.log(this.paymentDetailSetupForm.value);
      $("#myModal").modal("hide");
      this.toastr.success('Inserted Successfully!','PaymentDetailSetup. Register');
      this.paymentDetailSetupForm.reset();   
      this.service.refreshList();

      console.log("Insert Successfull");
   
      }); 
   }  


   updateRecord(){
    this.service.putPaymentDetailSetup(this.paymentDetailSetupForm.value).subscribe(res=>{
    $("#myModal").modal("hide");
     this.toastr.info('Updated Successfully!','PaymentDetailSetup. Update');
    this.paymentDetailSetupForm.reset();
    this.service.refreshList();
    console.log("Update Successfull");
    }); 
 }

   populateForm(PaymentDetailSetup){
     console.log(PaymentDetailSetup);
     this.paymentDetailSetupForm.patchValue(PaymentDetailSetup);
  }

  onDelete(id: number){
    if(confirm("Are you sure?")){
    this.service.deletePaymentDetailSetup(id).subscribe(res => {
      this.toastr.warning('Deleted Successfully!','PaymentDetailSetup. Remove');
      this.service.refreshList();
      console.log("Delete Successfull");
          
    })
  }
}

}
