import { Component, OnInit } from '@angular/core';
import { MembershipLevel } from './../data-types/membership';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-membership-editor',
  templateUrl: './membership-editor.component.html',
  styleUrls: ['./membership-editor.component.css']
})
export class MembershipEditorComponent implements OnInit {

  constructor() { }
  ////cToAdd: Class;
  showAddCard: boolean = false;
  showRemoveCard: boolean = false;
  membershipTypes: MembershipLevel[] = [];

  headers = ["Name:", "Price:"]
  rows = [];

  addButtonClick() { 
    if (this.showRemoveCard){ this.showRemoveCard = false; }
    this.showAddCard = !this.showAddCard;

    //alert("rows info: " + this.rows.values()[0] );
    // console.log("hello");
    // for(var x in this.rows.values()){
    //   console.log(x);
      
    // }
  }
  removeButtonClick() { 
    if (this.showAddCard){ this.showAddCard = false; }
    this.showRemoveCard = !this.showRemoveCard;
  }
  //fetch membership list and for populating the tapable
  fetchMembershipTypes() {
    const memtype: MembershipLevel = {Name: "Single Monthly", Price: 29.99, UniqueID: uuid()}
    const memtype2: MembershipLevel = {Name: "Couple Monthly", Price: 39.99, UniqueID: uuid() }
    this.membershipTypes = [memtype, memtype2]
    for(var mem in this.membershipTypes) {
      this.rows.push(mem)
    }
  }
  
  ngOnInit(): void {
    this.fetchMembershipTypes();
  }

}
