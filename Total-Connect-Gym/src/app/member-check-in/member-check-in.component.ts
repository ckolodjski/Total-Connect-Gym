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

  private _dbService: DatabaseService;

  constructor(dbService: DatabaseService) {
    this._dbService = dbService;
  }

  ngOnInit(): void {
  }

  async checkIn(memberID: string) {
    // TODO call db service function, remove commented code if unnecessary
    this._dbService.checkInMember(memberID);
    /*
    var res = await this._dbService.checkInMember(memberID);
    if (isSome(res)) {
      console.log(res);
    } else {
      console.log("Member check-in failed.");
    }
    */
  }

}
