import { Component, OnInit } from '@angular/core';
import { isSome, Option } from 'fp-ts/lib/Option';
import { Course } from '../data-types/course';
import { GymEmployee } from '../data-types/employee';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-time-clock-audit',
  templateUrl: './time-clock-audit.component.html',
  styleUrls: ['./time-clock-audit.component.css']
})
export class TimeClockAuditComponent implements OnInit {

  employees: GymEmployee[] = [];

  private _dbService: DatabaseService;
  constructor(dbService: DatabaseService) {
    this._dbService = dbService;
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  async getEmployees() {
    var res = await this._dbService.getGymEmployees();
    if (isSome(res)) {
      this.employees = res.value;
    } /*else {  // TODO remove else statement after development
      let x: GymEmployee = {Name: "Joe Bison", DateOfBirth: new Date(), CurrentlyClockedIn: false, HoursWorked: 57, UniqueID: "8675309"};
      this.employees[0] = x;
    }*/
  }

}
