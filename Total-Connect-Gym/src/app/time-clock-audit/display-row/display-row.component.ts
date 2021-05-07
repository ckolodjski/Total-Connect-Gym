import { Component, Input, OnInit } from '@angular/core';
import { DatabaseService } from '../../database.service';
import { GymEmployee } from 'src/app/data-types/employee';

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
      var res = await this._dbService.setHoursWorked(this.employee.UniqueID, this.hours);
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
