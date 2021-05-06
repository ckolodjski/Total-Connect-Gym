import { Component, OnInit } from '@angular/core';
import { MembershipLevel } from './../data-types/membership';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from '../database.service';
import { isSome } from 'fp-ts/lib/Option';

@Component({
  selector: 'app-membership-editor',
  templateUrl: './membership-editor.component.html',
  styleUrls: ['./membership-editor.component.css']
})
export class MembershipEditorComponent implements OnInit {

  constructor(private dbService: DatabaseService) { }

  showAddCard: boolean = false;
  showRemoveCard: boolean = false;
  membershipTypes: MembershipLevel[] = [];

  headers = ["Name:", "Price:"]
  rows = [];

  addButtonClick() { 
    if (this.showRemoveCard){ this.showRemoveCard = false; }
    this.showAddCard = !this.showAddCard;
  }
  removeButtonClick() { 
    if (this.showAddCard){ this.showAddCard = false; }
    this.showRemoveCard = !this.showRemoveCard;
  }
  //fetch membership list and for populating the tapable
  async fetchMembershipTypes() {
    var res = await this.dbService.getMembershipLevels()
    
    if (isSome(res)) {
      this.membershipTypes = res.value;
    }
    
    // const memtype: MembershipLevel = {Name: "Single Monthly", Price: 29.99, UniqueID: uuidv4()}
    // const memtype2: MembershipLevel = {Name: "Couple Monthly", Price: 39.99, UniqueID: uuidv4() }
    // this.membershipTypes = [memtype, memtype2]
    for(var mem in this.membershipTypes) {
      this.rows.push(mem)
    }
  }
  

  ngOnInit(): void {
    this.fetchMembershipTypes();
  }

}
