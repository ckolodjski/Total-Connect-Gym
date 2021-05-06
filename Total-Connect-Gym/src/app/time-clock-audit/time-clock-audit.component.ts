import { Component, OnInit } from '@angular/core';
import { isSome, Option } from 'fp-ts/lib/Option';
import { Course } from '../data-types/course';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-time-clock-audit',
  templateUrl: './time-clock-audit.component.html',
  styleUrls: ['./time-clock-audit.component.css']
})
export class TimeClockAuditComponent implements OnInit {

  private _dbService: DatabaseService;

  constructor(dbService: DatabaseService) {
    this._dbService = dbService;
  }

  ngOnInit(): void {
  }

  async getHours(employeeID: string) {
    // TODO confirm this works
    
    var res = await this._dbService.getHoursWorked(employeeID);
  }

  async setHours(employeeID: string, hours: number) {
    // TODO confirm this works
    
    var res = await this._dbService.setHoursWorked(employeeID, hours);
  }

}
