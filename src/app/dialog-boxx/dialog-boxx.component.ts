import { Component, OnInit } from '@angular/core';
import {  Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
 
export interface UsersData {
  name: string;
  id: number;
}
 
@Component({
  selector: 'app-dialog-boxx',
  templateUrl: './dialog-boxx.component.html',
  styleUrls: ['./dialog-boxx.component.css']
})
export class DialogBoxxComponent implements OnInit {

  

  ngOnInit() {
  }
  action:string;
  local_data:any;
 
  constructor(
    public dialogRef: MatDialogRef<DialogBoxxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) {
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
  }
 
  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }
 
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
 

}
