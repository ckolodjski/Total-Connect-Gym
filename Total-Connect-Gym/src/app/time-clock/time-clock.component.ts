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

  timeClockMessage: string = "";
  private _dbService: DatabaseService;

  constructor(dbService: DatabaseService) {
    this._dbService = dbService;
  }

  ngOnInit(): void {
  }

  async clockIn(employeeID: string) {
    // TODO confirm this works

    var res = await this._dbService.checkInMember(employeeID);
    
    if (res) {
      this.timeClockMessage = "You are now clocked in!"
    } else {
      this.timeClockMessage = "Error clocking in. Please double check your Employee ID or contact your supervisor."
    }
  }

  async clockOut(employeeID: string) {
    // TODO confirm this works

    var res = await this._dbService.checkInMember(employeeID);
    
    if (res) {
      this.timeClockMessage = "You are now clocked out!"
    } else {
      this.timeClockMessage = "Error clocking out. Please double check your Employee ID or contact your supervisor."
    }
  }

}
