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

  headers = ["Name:   ", "Price:   ", "ID:      "]
  rows = [];

  addButtonClick() { 
    if (this.showRemoveCard){ this.showRemoveCard = false; }
    this.showAddCard = !this.showAddCard;
  }
  removeButtonClick() { 
    if (this.showAddCard){ this.showAddCard = false; }
    this.showRemoveCard = !this.showRemoveCard;
  }
  refreshList() {
    this.fetchMembershipTypes();
  }
  //fetch membership list and for populating the tapable
  async fetchMembershipTypes() {
    var res = await this.dbService.getMembershipLevels()
    
    if (isSome(res)) {
      this.membershipTypes = res.value;
    }
    
  }
  

  ngOnInit(): void {
    this.fetchMembershipTypes();
  }

}
