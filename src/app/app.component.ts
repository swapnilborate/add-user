import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {  } from '@angular/forms';
import { UserService } from '../app/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'User Portfolio';
  userDetails : any;
  showModal : boolean;
  languages : any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  multiplelanguages: any;
 
  genderCount : any;
  maleGenderCount = [];
  femaleGenderCount = [];
  maleCount : any;
  femaleCount : any;
  userDetailsCount : any;

  
  userForm = this.fb.group({
    name: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    multiplelanguages: ['', Validators.required],
    userGender: ['', Validators.required],
    userInfo: ['', Validators.required]

  });

  constructor(  private userListService: UserService, private fb: FormBuilder) { }

  ngOnInit() {

    this.getAllUserData();

    this.dropdownList = [
      {"id":1,"itemName":"English"},
      {"id":2,"itemName":"Mandrain Chinse"},
      {"id":3,"itemName":"Hindi"},
      {"id":4,"itemName":"Spanish"},
      {"id":5,"itemName":"French"},
      {"id":6,"itemName":"Rusain"},
      {"id":7,"itemName":"Portuguse"},
      {"id":8,"itemName":"Indonesian"},
      {"id":9,"itemName":"Sapnish"},
      {"id":10,"itemName":"Latin"},
      {"id":11,"itemName":"English(UK)"},
      {"id":12,"itemName":"French"},
      {"id":13,"itemName":"German"}
    ];
this.selectedItems = [
        {"id":2,"itemName":"Singapore"},
        {"id":3,"itemName":"Australia"},
        {"id":4,"itemName":"Canada"},
        {"id":5,"itemName":"South Korea"}
    ];
this.dropdownSettings = { 
          singleSelection: false, 
          text:"Select Languages",
          selectAllText:'Select All',
          unSelectAllText:'UnSelect All',
          enableSearchFilter: true,
          classes:"myclass custom-class"
        };    
  }
  
  public getAllUserData () {

    this.userListService.getUsers().subscribe(data => {
      console.log("list is -------->", data);
      this.userDetails = data;
      this.userDetailsCount = this.userDetails.length;
      this.userDetails.forEach(value => {
        console.log(value.gender);
        if (value.gender == "Male"){
          this.maleGenderCount.push(value.gender);
          this.maleCount = this.maleGenderCount.length;
        }else{

          this.femaleGenderCount.push(value.gender);
          this.femaleCount = this.femaleGenderCount.length;
        }
        
      });
    });

  }

  public onClick(event)
  {
    this.showModal = true; 

  }
  public onClose(event){
    this.userForm.reset();
    this.showModal = false; 

  }
  onItemSelect(item:any){
    console.log(item);
    console.log(this.selectedItems);
}
OnItemDeSelect(item:any){
    console.log(item);
    console.log(this.selectedItems);
}
onSelectAll(items: any){
    console.log(items);
}
onDeSelectAll(items: any){
    console.log(items);
}
onSaveUser(event){
  console.log(this.userForm.value);
  let objValue = [];
  this.userForm.value.multiplelanguages.forEach(obj => {
    console.log(obj.itemName);
    
    objValue.push(obj.itemName);
  });
  let languages = objValue.toString();

  console.log(languages);
  let details = {
        "fullName": this.userForm.value.name,
        "dob": this.userForm.value.dateOfBirth,
        "languages": languages,
        "gender": this.userForm.value.userGender,
        "about": this.userForm.value.userInfo,

  }
  if (this.userForm.value.userGender == "Male"){
    this.maleCount = this.maleCount + 1;
  }else{
    this.femaleCount = this.femaleCount + 1;
  }
  this.userDetailsCount = this.userDetailsCount+ 1;
  this.userDetails.push(details);
  console.log(this.userDetails);
  this.userForm.reset();
  this.showModal = false; 

}
}
