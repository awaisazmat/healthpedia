import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {
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

  constructor() { }

  ngOnInit() {
  }

}
