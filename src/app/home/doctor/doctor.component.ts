import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/shared/doctor/doctor.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';


declare var $: any;
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  stateList: Array<any> = [
    { name: '', cities:[] },
    { name: 'Punjab', cities: ['Lahore', 'Rawalpindi', 'Faisalabad'] },
    { name: 'Sindh', cities: ['Larkana', 'Karachi', 'Hyderabad'] },
    { name: 'KPK', cities: ['Peshawar', 'Kohat', 'Banu'] },
    { name: 'Balochistan', cities: ['Quetta', 'Gawadar', 'Turbat'] },
    { name: 'AJK', cities: ['Bhimber', 'Mirpur', 'Kotli'] },
    { name: 'Gilgit Baltistan', cities: ['Skardu', 'Gilgit', 'Chilas'] },
  ];
  cities: Array<any>;
  changeState(count) {
    this.cities = this.stateList.find(con => con.name == count).cities;
  }




  dateFormat = 'dd/MM/yyyy';
  public minDate: Date = new Date("05/27/1900");
  public maxDate: Date = new Date();
  public dateValue: Date = new Date("05/16/2017");
  
  tabs1 = [
    {
      active: true,
      name: 'Personal Info',
      icon: 'profile'
    }
  ];
  tabs2 = [
    {
      active: true,
      name: 'Qualification',
      icon: 'read'
    }
  ];
  tabs3 = [
    {
      active: true,
      name: 'Experience',
      icon: 'plus-square'
    }
  ];
  tabs4 = [
    {
      active: true,
      name: 'Options',
      icon: 'setting'
    }
  ];
  
  submitted = false;
  

  constructor(private service : DoctorService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private msg: NzMessageService) { }


    loading = false;
    avatarUrl: string;
  
    
  
    beforeUpload = (file: File) => {
      return new Observable((observer: Observer<boolean>) => {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
          this.msg.error('You can only upload JPG file!');
          observer.complete();
          return;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.msg.error('Image must smaller than 2MB!');
          observer.complete();
          return;
        }
        // check height
        this.checkImageDimension(file).then(dimensionRes => {
          if (!dimensionRes) {
            this.msg.error('Image only 300x300 above');
            observer.complete();
            return;
          }
  
          observer.next(isJPG && isLt2M && dimensionRes);
          observer.complete();
        });
      });
    };
  
    private getBase64(img: File, callback: (img: string) => void): void {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result!.toString()));
      reader.readAsDataURL(img);
    }
  
    private checkImageDimension(file: File): Promise<boolean> {
      return new Promise(resolve => {
        const img = new Image(); // create image
        img.src = window.URL.createObjectURL(file);
        img.onload = () => {
          const width = img.naturalWidth;
          const height = img.naturalHeight;
          window.URL.revokeObjectURL(img.src!);
          resolve(width === height && width >= 300);
        };
      });
    }
  
    handleChange(info: { file: UploadFile }): void {
      switch (info.file.status) {
        case 'uploading':
          this.loading = true;
          break;
        case 'done':
          // Get this url from response in real world.
          this.getBase64(info.file!.originFileObj!, (img: string) => {
            this.loading = false;
            this.avatarUrl = img;
          });
          break;
        case 'error':
          this.msg.error('Network error');
          this.loading = false;
          break;
      }
    }


  ngOnInit() {
    this.service.refreshList();
  }

  specializationForm= this.fb.group({
    specialization:[''],
    spInstitution:[''],
    spYear:['2001'],
    spCity:[''],
    spCountry:['PK']
  })
  educationForm= this.fb.group({
    specialization:[''],
    spInstitution:[''],
    spYear:['2001'],
    spCity:[''],
    spCountry:['PK']
  })
  experienceForm= this.fb.group({
    organization:[''],
    designation:[''],
    exAddress:[''],
    exCity:[''],
    exCountry:['PK'],
    exState:[''],
    durationFrom:[''],
    durationTo:[''],
    durationTotal:['']
    
  })
  dataSet = [
    
    ]
  experienceDataSet=[

    ]
    addEducation(){
      console.log("added Education");
      // this.dataSet.length = 0; 
      // this.dataSet = [...this.dataSet, {name: 'Xyz'}]  
      this.dataSet = [...this.dataSet,this.educationForm.value];
      this.educationForm.reset();
  
      setTimeout(() => {
        console.log('2');            }, 1000);
    }
 addSpecialization(){
    console.log("added specialization");
    // this.dataSet.length = 0; 
    // this.dataSet = [...this.dataSet, {name: 'Xyz'}]  
    this.dataSet = [...this.dataSet,this.specializationForm.value];
    this.specializationForm.reset();

    setTimeout(() => {
      console.log('2');            }, 1000);
  }
  addExperience(){
    console.log("added experience");
    // this.dataSet.length = 0; 
    // this.dataSet = [...this.dataSet, {name: 'Xyz'}]  
    this.experienceDataSet = [...this.experienceDataSet,this.experienceForm.value];
    this.experienceForm.reset();

    setTimeout(() => {
      console.log('2');            }, 1000);
  }
  removeRow(index){
    console.log("removed");
    this.dataSet.splice(index, 1);
    this.dataSet = [...this.dataSet]
  }
  deleteRow(index){
    console.log("removed");
    this.experienceDataSet.splice(index, 1);
    this.experienceDataSet = [...this.experienceDataSet]
  }

  doctorForm = this.fb.group({
    SysDoctorId: [null],
    SysClinicId: [''],
    SysHospitalId: [''],
    ServiceId: [''],
    DoctorName: ['', Validators.required],
    FatherHusband: [''],
    RegNo: [''],
    CNIC: [''],
    DOB: [''],
    DoctorWhatsapp: [''], 
    ContactNo_: [''],
    MartialStatus: ['Single'],
    Gender: ['Male'],
    DoctorEmail: ['',[Validators.required, Validators.email]],
    Specialization: [''],
    PresentAddress: [''],
    PermanentAddress: [''],
    HospitalClinicAddress: [''],
    IssueDate: [''],
    validitydate: [''], 
    Qualification: [''], 
    Institute: [''],
    year: [''],
    country: ['']



  })

  get f() { return this.doctorForm.controls; }

  
  onSubmit(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.doctorForm.invalid) {
            return;
        }
    

    
 if(this.doctorForm.value.SysDoctorId==null){
     
      this.insertRecord();
      
    }
    else
      this.updateRecord();
  }


  insertRecord(){
      this.service.postDoctor(this.doctorForm.value).subscribe(res=>{
      console.log(this.doctorForm.value);
      $("#myModal").modal("hide");
      this.toastr.success('Inserted Successfully!','Doctor. Register');
      this.doctorForm.reset();   
      this.service.refreshList();

      console.log("Insert Successfull");
   
      }); 
   }  


   updateRecord(){
    this.service.putDoctor(this.doctorForm.value).subscribe(res=>{
    $("#myModal").modal("hide");
     this.toastr.info('Updated Successfully!','Doctor. Update');
    this.doctorForm.reset();
    this.service.refreshList();
    console.log("Update Successfull");
    }); 
 }

   populateForm(doc){
     console.log(doc);
     this.doctorForm.patchValue(doc);
  }

  onDelete(id: number){
    if(confirm("Are you sure?")){
    this.service.deleteDoctor(id).subscribe(res => {
      this.toastr.warning('Deleted Successfully!','Doctor. Remove');
      this.service.refreshList();
      console.log("Delete Successfull");
          
    })
  }
}

    
}


