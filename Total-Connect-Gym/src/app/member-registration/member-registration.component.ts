import { Component, OnInit } from '@angular/core';
import { MembershipLevel } from '../data-types/membership';
import { DatabaseService } from '../database.service';
import { v4 as uuidv4 } from 'uuid';
import { isSome } from 'fp-ts/lib/Option';
@Component({
  selector: 'app-member-registration',
  templateUrl: './member-registration.component.html',
  styleUrls: ['./member-registration.component.css']
})
export class MemberRegistrationComponent implements OnInit {

  constructor(private dbService: DatabaseService) { }
  membershipTypes: MembershipLevel[] = [];
  headers = ["Name:   ", "Price:   ", "ID:      "];

  addMember: boolean = true;
  removeMember: boolean = false;
  //fetch membership list and for populating the table
  async fetchMembershipTypes() {
    var res = await this.dbService.getMembershipLevels()

    if (isSome(res)) {
      this.membershipTypes = res.value;
    }

  }

  addButtonClick() {
    if(this.removeMember) { this.removeMember = false;}
    this.addMember = !this.addMember;
  }
  removeButtonClick(){
    if(this.addMember) {this.addMember = false;}
    this.removeMember = !this.removeMember;
  }
  editButtonClick(){

  }
  ngOnInit(): void {
    this.fetchMembershipTypes();
  }

}
