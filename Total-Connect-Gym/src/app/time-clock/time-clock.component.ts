import { Component, OnInit } from '@angular/core';
import { isSome, Option } from 'fp-ts/lib/Option';
import { Course } from '../data-types/course';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-time-clock',
  templateUrl: './time-clock.component.html',
  styleUrls: ['./time-clock.component.css']
})
export class TimeClockComponent implements OnInit {

  clockInMessage: string = "";
  private _dbService: DatabaseService;

  constructor(dbService: DatabaseService) {
    this._dbService = dbService;
  }

  ngOnInit(): void {
  }

  async clockIn(employeeID: string) {
    // TODO call db service function

    var res = await this._dbService.checkInMember(employeeID);
    
    if (res) {
      this.clockInMessage = "You are now clocked in!"
    } else {
      this.clockInMessage = "Error clocking in. Please double check your Employee ID or contact your supervisor."
    }
  }

}
