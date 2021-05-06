import { Component, OnInit } from '@angular/core';
import { isSome, Option } from 'fp-ts/lib/Option';
import { Course } from '../data-types/course';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-member-check-in',
  templateUrl: './member-check-in.component.html',
  styleUrls: ['./member-check-in.component.css']
})
export class MemberCheckInComponent implements OnInit {

  checkInMessage: string = "";
  private _dbService: DatabaseService;

  constructor(dbService: DatabaseService) {
    this._dbService = dbService;
  }

  ngOnInit(): void {
  }

  async checkIn(memberID: string) {
    // TODO call db service function

    var res = await this._dbService.checkInMember(memberID);
    
    if (res) {
      this.checkInMessage = "You have been checked in!"
    } else {
      this.checkInMessage = "Error checking in. Please double check your Member ID or ask an employee for assistance."
    }
  }

}
