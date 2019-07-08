import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/shared/doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  constructor(private service : DoctorService) { }

  ngOnInit() {
    this.service.refreshList();
  }

}
