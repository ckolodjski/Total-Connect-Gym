import { Component, Input, OnInit } from '@angular/core';
import { DatabaseService } from '../../database.service';
import { GymEmployee } from 'src/app/data-types/employee';
import { isSome } from 'fp-ts/lib/Option';

@Component({
  selector: 'app-display-row',
  templateUrl: './display-row.component.html',
  styleUrls: ['./display-row.component.css']
})
export class DisplayRowComponent implements OnInit {

  @Input() employee: GymEmployee;
  first: string;
  last: string;
  hours: number;
  newHours: string;

  editMode: boolean = false;
  editMsg: string = "Edit";

  private _dbService: DatabaseService;
  constructor(dbService: DatabaseService) { 
    this._dbService = dbService;
  }

  ngOnInit(): void {
    this.first = this.employee.Name.split(" ")[0];
    this.last = this.employee.Name.split(" ")[1];
    this.hours = this.employee.HoursWorked;
  }

  async editHours() {
    if (this.editMode) {
      // save hours to database
      let h: number = parseInt(this.newHours);
      var res = await this._dbService.setHoursWorked(this.employee.UniqueID, h);
      var newRes = await this._dbService.getHoursWorked(this.employee.UniqueID);
      if (isSome(newRes)) {
        this.hours = newRes.value;
      }
    }
    this.toggleEdit();
  }

  toggleEdit() {
    if (!this.editMode) {
      this.editMode = true;
      this.editMsg = "Save";
    } else {
      this.editMode = false;
      this.editMsg = "Edit";
    }
  }

}
