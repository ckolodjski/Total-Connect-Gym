import { Component, OnInit } from '@angular/core';
import { MembershipType } from '../models/membership_type.model'
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
  membershipTypes: MembershipType[] = [];

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
    const memtype: MembershipType = {name: "Single Monthly", price: 29.99}
    const memtype2: MembershipType = {name: "Couple Monthly", price: 39.99}
    this.membershipTypes = [memtype, memtype2]
    for(var mem in this.membershipTypes) {
      this.rows.push(mem)
    }
  }
  
  ngOnInit(): void {
    this.fetchMembershipTypes();
  }

}
