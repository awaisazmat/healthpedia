import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public minDate: Date = new Date();
  public maxDate: Date = new Date("05/27/3000");
  public dateValue: Date = new Date("05/16/2017");

  constructor() { }

  ngOnInit() {
  }

}
