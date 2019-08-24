import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/shared/article/article.service';

declare var $: any;
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  submitted = false;
  

  constructor(private service : ArticleService,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  articleForm = this.fb.group({
  
   
    ArticleId :[null],
    ArticleName :['', Validators.required],
    LastRead  :[''],
    Parts :[''],
    UserId :['']
    



  })

  get f() { return this.articleForm.controls; }

  
  onSubmit(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.articleForm.invalid) {
            return;
        }
    

    
 if(this.articleForm.value.ArticleId==null){
     
      this.insertRecord();
      
    }
    else
      this.updateRecord();
  }


  insertRecord(){
      this.service.postArticle(this.articleForm.value).subscribe(res=>{
      console.log(this.articleForm.value);
      $("#myModal").modal("hide");
      this.toastr.success('Inserted Successfully!','Article. Register');
      this.articleForm.reset();   
      this.service.refreshList();

      console.log("Insert Successfull");
   
      }); 
   }  


   updateRecord(){
    this.service.putArticle(this.articleForm.value).subscribe(res=>{
    $("#myModal").modal("hide");
     this.toastr.info('Updated Successfully!','Article. Update');
    this.articleForm.reset();
    this.service.refreshList();
    console.log("Update Successfull");
    }); 
 }

   populateForm(article){
     console.log(article);
     this.articleForm.patchValue(article);
  }

  onDelete(id: number){
    if(confirm("Are you sure?")){
    this.service.deleteArticle(id).subscribe(res => {
      this.toastr.warning('Deleted Successfully!','Article. Remove');
      this.service.refreshList();
      console.log("Delete Successfull");
          
    })
  }
}


}
